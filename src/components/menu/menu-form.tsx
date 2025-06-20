import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { Form } from '@/components/ui/form.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type Option } from '@/components/ui/multiple-selector.tsx'
import { useState } from 'react'
import { WidgetProperties } from '@/components/menu/widget-properties.tsx'
import { WidgetIngredients } from '@/components/menu/widget-ingredients.tsx'
import { formSchema } from '@/components/menu/form-schema.tsx'
import type { SelectedItem } from '@/types/item.ts'
import { ItemSelection } from '@/components/items/items-selection.tsx'

export function MenuForm() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuName: '',
      items: [],
    },
  })

  const onSelectedItemsChangeHandler = (selectedOptions: Option[]) => {
    const newSelectedItems = selectedOptions.map((option) => {
      const existingItem = selectedItems.find(
        (item) => item.id === Number(option.value),
      )

      return {
        id: Number(option.value),
        name: option.label, // Add basic info from option
        description: '', // Will be filled by query results
        price: 0, // Will be filled by query results
        quantity: existingItem?.quantity || 1,
      }
    })

    setSelectedItems(newSelectedItems)
  }

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    )
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Create New Menu</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <WidgetProperties form={form}>
            <ItemSelection
              form={form}
              selectedItems={selectedItems}
              onSelectedItemsChange={onSelectedItemsChangeHandler}
              onQuantityChange={handleQuantityChange}
            />
          </WidgetProperties>
          <WidgetIngredients selectedItems={selectedItems} />
          <Button type="submit">Create Menu</Button>
        </form>
      </Form>
    </div>
  )
}
