import type { SelectedItem } from '@/types/item.ts'
import type { Option } from '@/components/ui/multiple-selector.tsx'
import MultipleSelector from '@/components/ui/multiple-selector.tsx'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form.tsx'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchItems } from '@/api/item-service.ts'
import { Input } from '@/components/ui/input.tsx'

interface ItemSelectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
  selectedItems: SelectedItem[]
  onSelectedItemsChange: (selectedItemOptions: Option[]) => void
  onQuantityChange: (itemId: number, quantity: number) => void
}

export function ItemSelection({
  form,
  selectedItems,
  onSelectedItemsChange,
  onQuantityChange,
}: ItemSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: items = [] } = useQuery({
    queryKey: ['items', searchTerm],
    queryFn: ({ queryKey }) => {
      return fetchItems(queryKey[1])
    },
  })

  const options: Option[] = items.map((item) => ({
    value: String(item.id),
    label: item.name,
    key: String(item.id),
  }))

  return (
    <>
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
                    setSearchTerm(searchTerm)
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
        )}
      />

      {selectedItems.length > 0 && (
        <div className="flex">
          <div className="col-span-12 col-start-auto flex self-end flex-col gap-2 p-4 space-y-0 items-start">
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 bg-muted/25 rounded-md"
              >
                <div className="flex-1 min-w-0 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </p>
                  </div>
                  {/* Add quantity control */}
                  <div className="flex items-center gap-2 ml-4">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1
                        const quantity = Math.max(1, value) // Ensure quantity is at least 1
                        onQuantityChange(item.id, quantity)
                      }}
                      className="w-20 h-8 text-center"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
