import { generateText, hasToolCall, stepCountIs } from 'ai';
import { geminiModel } from './providers/geminiModel.js';
import { exampleTool } from './tools/exampleTool.js';
import { searchVault } from './tools/searchVault.js';

async function rodarAgente(pergunta: string) {
    console.log(`\n🤖 Pensando sobre: "${pergunta}"...`);

    const { text, toolCalls } = await generateText({
        model: geminiModel,
        system: 'Você é um assistente inteligente. Use as ferramentas fornecidas sempre que necessário para responder com precisão.',
        prompt: pergunta,
        tools: {
            exampleTool,
            searchVault
        },
        stopWhen: hasToolCall('finalAnswer')
    });

    if (toolCalls && toolCalls.length > 0) {
        console.log(`Ferramentas ativadas:`, toolCalls.map(t => t.toolName).join(', '));
    }

    console.log(`\nResposta Final:\n${text}\n`);
}

async function iniciar() {
    await rodarAgente('Busque na vault de conhecimento as últimas notícias sobre criptomoedas e me dê um resumo.');
}

iniciar();