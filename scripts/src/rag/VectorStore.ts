import { FeatureExtractionPipeline, pipeline } from '@huggingface/transformers';
import * as lancedb from '@lancedb/lancedb';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export type Document = {
    id: string;
    text: string;
    vector: number[];
    category: string[];
}

export class VectorStore<T extends Document> {
    protected db: lancedb.Connection | null = null;
    protected extractor: FeatureExtractionPipeline | null = null;
    protected table: lancedb.Table | null = null;
    protected tableName: string | null = null;

    async init(table: string) {
        this.tableName = table;
        const __dirname = dirname(fileURLToPath(import.meta.url));
        this.db = await lancedb.connect(join(__dirname, '../../data/lancedb'));
        this.extractor = await pipeline("feature-extraction", "Xenova/multilingual-e5-small");
        try {
            this.table = await this.db.openTable(table);
        } catch {
            this.table = null;
        }
    }

    async embed(text: string): Promise<number[]> {
        if (!this.extractor) {
            throw new Error("Extractor not initialized");
        }

        const output = await this.extractor(text, {
            pooling: 'mean',
            normalize: true,
        });

        return Array.from(output.data);
    }

    // multilingual-e5 exige prefixos diferentes para indexar vs buscar
    async embedQuery(query: string): Promise<number[]> {
        return this.embed(`query: ${query}`);
    }

    async addDocument(doc: Omit<T, 'vector'>) {
        if (!this.db || !this.table) {
            throw new Error("Database not initialized");
        }

        const vector = await this.embed(doc.text);

        const document = {
            ...doc,
            vector,
        };

        await this.db.createTable(this.table.name, [document], {
            mode: 'overwrite',
        });

        return document;
    }

    async search(query: string, limit: number = 5): Promise<T[]> {
        if (!this.db || !this.table) {
            throw new Error("Database not initialized");
        }

        const table = await this.db.openTable(this.table.name);
        const queryVector = await this.embedQuery(query);
        const results = await table.search(queryVector).limit(limit).toArray();

        return results as T[];
    }
}