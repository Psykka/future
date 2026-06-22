import { z } from "zod"

export const ConfigSchema = z.object({
    GEMINI_API_KEY: z.string(),
})

export type Config = z.infer<typeof ConfigSchema>

export function getConfig(): Config {
    const env = ConfigSchema.safeParse(process.env)

    if (!env.success) {
        console.error("Invalid environment variables:", env.error.format())
        throw new Error("Invalid environment variables")
    }

    return env.data
}