import {z} from "zod";

export const itemSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    price: z.number().min(0),
    category: z.string().optional(),
})

export type Item = z.infer<typeof itemSchema>
