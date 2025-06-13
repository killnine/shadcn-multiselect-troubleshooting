import {z} from "zod";

export const optionSchema = z.object({
    value: z.string(),
    label: z.string(),
    disable: z.boolean().optional(),
    key: z.string(),
    fixed: z.boolean().optional()
})
