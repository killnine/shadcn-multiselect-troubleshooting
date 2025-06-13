import {z} from "zod";
import {optionSchema} from "@/components/menu/option-schema.tsx";

export const formSchema = z.object({
    menuName: z.string().min(1, "Menu name is required"),
    items: z.array(optionSchema).min(1, "At least one item must be selected")
})
