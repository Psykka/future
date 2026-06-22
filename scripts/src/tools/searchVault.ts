import { getStore } from '@/rag/store.js';
import { tool } from 'ai'
import { z } from 'zod'

export const searchVault = tool({
    description: 'Busca por informações relevantes dentro do vault de conhecimento.',
    inputSchema: z.object({
        query: z.string().describe('A consulta ou pergunta para buscar no vault.'),
    }),
    execute: async ({ query }: { query: string }) => {
        const store = await getStore('vault');
        const results = await store.search(query, 5);
        return results.map(item => item.text).join('\n---\n');
    },
});