import {Button} from '@/components/ui/button';
import {z} from 'zod';
import {
    Form,
} from "@/components/ui/form.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {type Option} from "@/components/ui/multiple-selector.tsx";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchItems, fetchItemsByIds} from '@/api/item-service';
import {WidgetProperties} from "@/components/menu/widget-properties.tsx";
import {WidgetIngredients} from "@/components/menu/widget-ingredients.tsx";

export const optionSchema = z.object({
    value: z.string(),
    label: z.string(),
    disable: z.boolean().optional(),
    key: z.string(),
    fixed: z.boolean().optional()
})

export const formSchema = z.object({
    menuName: z.string().min(1, "Menu name is required"),
    items: z.array(optionSchema).min(1, "At least one item must be selected")
})

export function MenuForm() {

    const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);



    const {
        data: selectedItems = [],
    } = useQuery({
        queryKey: ['selectedItems', selectedItemIds],
        queryFn: ({ queryKey }) => {
            return fetchItemsByIds(queryKey[1] as number[])
        },
        enabled: selectedItemIds.length > 0,
    })



    function onSubmit(values: z.infer<typeof formSchema>){
        console.log(values)
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            menuName: "",
            items: [],
        },
    })

    const onSelectedItemsChangeHandler = (selectedOptions: Option[]) => {
        setSelectedItemIds(selectedOptions.map(item => Number(item.value)));
    }

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-3xl font-bold mb-6">Create New Menu</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <WidgetProperties form={form} selectedItems={selectedItems} onSelectedItemsChange={onSelectedItemsChangeHandler}/>
                    <WidgetIngredients form={form} selectedItemIds={selectedItems.map((i) => i.id)}/>
                    <Button type="submit">Create Menu</Button>
                </form>
            </Form>
        </div>
    )
}
