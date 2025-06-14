import { z } from 'zod';

export const ingredientSchema = z.object({
    name: z.string(),
    quantity: z.number()
})

export const billOfMaterialsSchema = z.object({
    name: z.string(),
    itemId: z.number(),
    yield: z.number(),
    ingredients: z.array(ingredientSchema)
})

export type Ingredient = z.infer<typeof ingredientSchema>
export type BillOfMaterials = z.infer<typeof billOfMaterialsSchema>
