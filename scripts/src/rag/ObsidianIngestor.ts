import { glob } from "glob/raw";
import { Document, VectorStore } from "./VectorStore.js";
import path from "node:path";
import { readFile } from "node:fs/promises";
import * as lancedb from '@lancedb/lancedb';
import yaml from 'js-yaml';

type ChuckNote = {
    title: string;
    path: string;
} & Document

export class ObsidianIngestor extends VectorStore<ChuckNote> {
    constructor() {
        super();
    }

    async ingestNote(title: string, path: string, content: string, category: string[]) {
        const doc: Omit<ChuckNote, 'vector'> = {
            id: path,
            title,
            path,
            category,
            text: content,
        };

        await this.addDocument(doc);
    }

    private parseFrontmatter(content: string): { categories: string[]; body: string } {
        const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
        if (!match) return { categories: [], body: content };

        try {
            const fm = yaml.load(match[1]) as Record<string, unknown>;
            const categories: string[] = [];

            if (typeof fm?.tipo === 'string') categories.push(fm.tipo);

            const tags = fm?.tags;
            if (Array.isArray(tags)) {
                for (const tag of tags) {
                    if (typeof tag === 'string' && !categories.includes(tag)) {
                        categories.push(tag);
                    }
                }
            }

            return { categories, body: match[2].trim() };
        } catch {
            return { categories: [], body: content };
        }
    }

    private breakTextIntoChunks(text: string, maxChunkSize: number = 500): string[] {
        const sentences = text.split(/\n\s*\n/);
        const chunks: string[] = [];

        let currentChunk = '';
        for (const sentence of sentences) {
            if ((currentChunk + sentence).length > maxChunkSize) {
                if (currentChunk) {
                    chunks.push(currentChunk.trim());
                }
                currentChunk = sentence;
            } else {
                currentChunk += '\n\n' + sentence;
            }
        }

        if (currentChunk.trim().length > 0) {
            chunks.push(currentChunk.trim());
        }

        return chunks;
    }

    async ingestNoteInChunks(valutPath: string): Promise<lancedb.Table> {
        if (!this.db || !this.tableName) throw new Error("Database not initialized");

        console.log(`Iniciando ingestão de notas do vault: ${valutPath}`);

        const note = await glob(`${valutPath}/**/*.md`, {
            cwd: process.cwd(),
            absolute: true,
            ignore: [
                '**/.obsidian/**',
                '**/.claude/**',
                '**/node_modules/**',
                '**/data/**',
                '**/dist/**',
                '**/scripts/**',
            ]
        });

        console.log(`Encontradas ${note.length} notas. Iniciando processamento...`);
        const startTime = Date.now();
        const allChunks: ChuckNote[] = [];

        for (const notePath of note) {
            const fileName = path.basename(notePath, '.md');
            const relativePath = path.relative(process.cwd(), notePath);
            const raw = await readFile(notePath, 'utf-8');

            if (raw.trim().length === 0) continue;

            const { categories, body } = this.parseFrontmatter(raw);
            const chunks = this.breakTextIntoChunks(body);

            for (let i = 0; i < chunks.length; i++) {
                const textChunk = chunks[i];
                const vector = await this.embed(`passage: ${textChunk}`);

                allChunks.push({
                    id: `${relativePath}#chunk-${i}`,
                    title: fileName,
                    path: relativePath,
                    text: textChunk,
                    vector,
                    category: categories,
                })
            }
        }

        console.log(`Processamento concluído. Iniciando inserção de ${allChunks.length} chunks na base de dados...`);

        const table = await this.db.createTable(this.tableName, allChunks, {
            mode: 'overwrite',
        });
        this.table = table;

        const endTime = Date.now();
        console.log(`Ingestão concluída em ${(endTime - startTime) / 1000} segundos.`);

        return table;
    }
}