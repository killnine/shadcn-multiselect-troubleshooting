import {Button} from '@/components/ui/button';
import {z} from 'zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";
import MultipleSelector, {type Option} from "@/components/ui/multiple-selector.tsx";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchItems, fetchItemsByIds} from '@/api/item-service';

export function MenuForm() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

    const {
        data: items = [],
    } = useQuery({
        queryKey: ['items', searchTerm],
        queryFn: ({ queryKey }) => {
            const fetched = fetchItems(queryKey[1])
            return fetched
        },
    })

    const {
        data: selectedItems = [],
    } = useQuery({
        queryKey: ['selectedItems', selectedItemIds],
        queryFn: ({ queryKey }) => {
            return fetchItemsByIds(queryKey[1] as number[])
        },
        enabled: selectedItemIds.length > 0,
    })

    const options: Option[] = items.map(item => ({
        value: String(item.id),
        label: item.name,
        key: String(item.id),
    }))

    const optionSchema = z.object({
        value: z.string(),
        label: z.string(),
        disable: z.boolean().optional(),
        key: z.string(),
        fixed: z.boolean().optional()
    })

    const formSchema = z.object({
        menuName: z.string().min(1, "Menu name is required"),
        items: z.array(optionSchema).min(1, "At least one item must be selected")
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
                    <FormField
                        control={form.control}
                        name="menuName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Menu Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter menu name" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Give your menu a title
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="items"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Items</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        {...field}
                                        onSearchSync={(searchTerm) => {
                                            setSearchTerm(searchTerm);
                                            return options
                                        }}
                                        onChange={(selectedItems) => {
                                            onSelectedItemsChangeHandler(selectedItems)
                                        }}
                                        placeholder="Select items for the menu"
                                        emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                no results found.
                                            </p>
                                        }
                                        />
                                </FormControl>
                            </FormItem>
                        )}/>
                    <Button type="submit">Create Menu</Button>
                </form>
            </Form>
        </div>
    )
}
