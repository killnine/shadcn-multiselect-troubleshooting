import type { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { formSchema } from "./menu-form";
import type z from "zod";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import { Input } from "../ui/input";
import MultipleSelector, {type Option} from "@/components/ui/multiple-selector.tsx";
import type { Item } from "@/types/item";
import {useQuery} from "@tanstack/react-query";
import {fetchItems} from "@/api/item-service.ts";
import {useState} from "react";

interface WidgetPropertiesProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    selectedItems: Item[]
    onSelectedItemsChange: (selectedItemOptions: Option[]) => void
}

export function WidgetProperties({ form, selectedItems, onSelectedItemsChange }: WidgetPropertiesProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const {
        data: items = [],
    } = useQuery({
        queryKey: ['items', searchTerm],
        queryFn: ({ queryKey }) => {
            const fetched = fetchItems(queryKey[1])
            return fetched
        },
    })

    const options: Option[] = items.map(item => ({
        value: String(item.id),
        label: item.name,
        key: String(item.id),
    }))

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Menu Properties
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        Basic specifications of the menu
                    </p>
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-12 gap-4">
                <FormField
                    control={form.control}
                    name="menuName"
                    render={({ field }) => (
                        <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                            <FormLabel className="flex shrink-0">Menu Name</FormLabel>
                            <FormDescription>
                                Give your menu a title
                            </FormDescription>
                            <div className="w-full">
                            <FormControl>
                                <Input placeholder="Enter menu name" {...field} />
                            </FormControl>
                            </div>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="items"
                    render={({ field }) => (
                        <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                            <FormLabel className="flex shrink-0">Items</FormLabel>
                            <div className="w-full">
                                <FormControl>
                                    <MultipleSelector
                                        {...field}
                                        onSearchSync={(searchTerm) => {
                                            setSearchTerm(searchTerm);
                                            return options
                                        }}
                                        onChange={(selectedItems) => {
                                            onSelectedItemsChange(selectedItems)
                                        }}
                                        placeholder="Select items for the menu"
                                        emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                no results found.
                                            </p>
                                        }
                                    />
                                </FormControl>
                            </div>
                        </FormItem>
                    )}/>

                {selectedItems.length > 0 && (
                    <div className="flex">
                        <div className="col-span-12 col-start-auto flex self-end flex-col gap-2 p-4 space-y-0 items-start">
                            {selectedItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-2 bg-muted/25 rounded-md"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-sm">{item.name} - </span>
                                            <span className="font-light text-sm truncate">{item.name}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
