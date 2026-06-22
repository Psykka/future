#!/usr/bin/env node
/**
 * vault_rag.ts — Indexação e busca semântica do vault (LanceDB + nomic-embed)
 *
 * Comandos:
 *   npx tsx src/vault_rag.ts reindex              → indexa vault → LanceDB tabela 'documents'
 *   npx tsx src/vault_rag.ts search "query"       → top 5 resultados
 *   npx tsx src/vault_rag.ts search "query" 8     → top 8 resultados
 */

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ObsidianIngestor } from './rag/ObsidianIngestor.js';
import { getStore } from './rag/store.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const VAULT_ROOT = join(__dirname, '../..');
const TOP_K = 5;
const TABLE_NAME = 'vault';

async function reindex() {
    const ingestor = new ObsidianIngestor();
    await ingestor.init(TABLE_NAME);
    await ingestor.ingestNoteInChunks(VAULT_ROOT);
}

async function search(query: string, topK = TOP_K) {
    const store = await getStore(TABLE_NAME);
    const results = await store.search(query, topK);

    if (results.length === 0) {
        console.log(`Nenhum resultado para: "${query}"`);
        return;
    }

    console.log(`\n## Resultados para: "${query}"\n`);
    for (const item of results) {
        const doc = item as { text: string; path?: string; title?: string };
        console.log(`**Fonte:** \`${doc.path ?? 'desconhecido'}\``);
        console.log(`**${doc.title ?? ''}**\n`);
        console.log(doc.text.slice(0, 900));
        console.log('\n---\n');
    }
}

// ── CLI ───────────────────────────────────────────────────────────────────────

const [, , cmd, ...args] = process.argv;

switch (cmd) {
    case 'reindex':
        reindex().catch(console.error);
        break;

    case 'search': {
        const query = args[0];
        const topK = args[1] ? parseInt(args[1], 10) : TOP_K;
        if (!query) {
            console.error('Uso: npx tsx src/vault_rag.ts search "sua query" [top_k]');
            process.exit(1);
        }
        search(query, topK).catch(console.error);
        break;
    }

    default:
        console.log(`
vault_rag.ts — Busca semântica no vault Obsidian (LanceDB)

  npx tsx src/vault_rag.ts reindex              Indexa todos os .md
  npx tsx src/vault_rag.ts search "query"       Busca semântica (top ${TOP_K})
  npx tsx src/vault_rag.ts search "query" 10    Busca semântica (top 10)
        `);
}
