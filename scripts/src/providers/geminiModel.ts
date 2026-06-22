import { getConfig } from "@/env.js"
import { createGoogleGenerativeAI } from "@ai-sdk/google"

const googleProvider = createGoogleGenerativeAI({
    apiKey: getConfig().GEMINI_API_KEY,
})

export const geminiModel = googleProvider.languageModel('gemini-2.5-flash')