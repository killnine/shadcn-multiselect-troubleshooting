import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {useQuery} from "@tanstack/react-query";
import { fetchItemsByIds} from "@/api/item-service.ts";

interface WidgetIngredientProps {
    selectedItemIds: number[]
}

export function WidgetIngredients({ selectedItemIds }: WidgetIngredientProps) {
    // TODO: fetch ingredients for the selected Items

    const {
        data: items = [],
    } = useQuery({
        queryKey: ['selectedItems', selectedItemIds],
        queryFn: ({ queryKey }) => {
            const fetched = fetchItemsByIds(queryKey[1] as number[])
            return fetched
        },
    })

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
                {items.length > 0 ? (
                    <div className="col-span-12">
                        <ul className="divide-y divide-muted border border-muted rounded-lg overflow-hidden shadow-sm bg-background">
                            {items.map(item => (
                                <li
                                    key={item.id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 hover:bg-accent transition-colors"
                                >
                                    <div>
                                        <span className="font-medium text-primary">{item.name}</span>
                                        <span className="block text-muted-foreground text-xs sm:text-sm">{item.description}</span>
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
