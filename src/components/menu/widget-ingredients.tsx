import type { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { formSchema } from "./menu-form";
import type z from "zod";

interface WidgetIngredientProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    selectedItemIds: number[]
}

export function WidgetIngredients({ form }: WidgetIngredientProps) {
    // TODO: fetch ingredients for the selected Items

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Menu Ingredients
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        Materials required to prepare the selected menu items
                    </p>
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-12 gap-4">

            </CardContent>
        </Card>
    );
}
