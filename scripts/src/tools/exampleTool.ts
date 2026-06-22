import { tool } from 'ai'
import { z } from 'zod'

export const exampleTool = tool({
    description: 'Busca a temperatura atual de uma cidade.',
    inputSchema: z.object({
        cidade: z.string().describe('Nome da cidade, ex: Rio de Janeiro'),
    }),
    execute: async ({ cidade }: { cidade: string }) => {
        return { temperatura: '28°C', condicao: 'Ensolarado', local: cidade };
    },
});