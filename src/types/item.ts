import {z} from "zod";

export const itemSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    price: z.number().min(0),
    category: z.string().optional(),
})

export const selectedItemSchema = itemSchema.extend({
    quantity: z.number().min(1).default(1),
})

export type Item = z.infer<typeof itemSchema>
export type SelectedItem = z.infer<typeof selectedItemSchema>
