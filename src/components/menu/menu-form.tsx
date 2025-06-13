import { Button } from '@/components/ui/button';
import { z } from 'zod';
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

const OPTIONS: Option[] = [
    { label: 'nextjs', value: 'Nextjs' },
    { label: 'React', value: 'react' },
    { label: 'Remix', value: 'remix' },
    { label: 'Vite', value: 'vite' },
    { label: 'Nuxt', value: 'nuxt' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Angular', value: 'angular' },
    { label: 'Ember', value: 'ember', disable: true },
    { label: 'Gatsby', value: 'gatsby', disable: true },
    { label: 'Astro', value: 'astro' },
];

export function MenuForm() {

    const itemSchema = z.object({
        id: z.number(),
        name: z.string(),
        description: z.string().optional(),
        price: z.number().min(0),
        category: z.string().optional(),
        available: z.boolean().default(true)
    })

    const formSchema = z.object({
        menuName: z.string().min(1, "Menu name is required"),
        items: z.array(itemSchema)
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
                                    defaultOptions={OPTIONS}
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
