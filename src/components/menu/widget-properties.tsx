import type { UseFormReturn } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import type z from 'zod'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '../ui/input'
import { type Option } from '@/components/ui/multiple-selector.tsx'
import type { SelectedItem } from '@/types/item'
import { formSchema } from '@/components/menu/form-schema.tsx'
import { ItemSelection } from '@/components/items/items-selection.tsx'

interface WidgetPropertiesProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
  selectedItems: SelectedItem[]
  onSelectedItemsChange: (selectedItemOptions: Option[]) => void
  onQuantityChange: (itemId: number, quantity: number) => void
}

export function WidgetProperties({
  form,
  selectedItems,
  onSelectedItemsChange,
  onQuantityChange,
}: WidgetPropertiesProps) {
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
              <FormDescription>Give your menu a title</FormDescription>
              <div className="w-full">
                <FormControl>
                  <Input placeholder="Enter menu name" {...field} />
                </FormControl>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <ItemSelection
          form={form}
          selectedItems={selectedItems}
          onSelectedItemsChange={onSelectedItemsChange}
          onQuantityChange={onQuantityChange}
        />
      </CardContent>
    </Card>
  )
}
