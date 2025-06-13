import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type {SelectedItem} from "@/types/item.ts";

interface WidgetIngredientProps {
    selectedItems: SelectedItem[]
}

export function WidgetIngredients({ selectedItems }: WidgetIngredientProps) {
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
                {selectedItems.length > 0 ? (
                    <div className="col-span-12">
                        <ul className="divide-y divide-muted border border-muted rounded-lg overflow-hidden shadow-sm bg-background">
                            {selectedItems.map(item => (
                                <li
                                    key={item.id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 hover:bg-accent transition-colors"
                                >
                                    <div>
                                        <span className="font-medium text-primary">{item.name}</span>
                                        <span className="block text-muted-foreground text-xs sm:text-sm">{item.description}</span>
                                        <span className="font-bold text-primary">{item.quantity}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="col-span-12 text-muted-foreground italic text-center py-6">
                        No ingredients found for the selected items.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
