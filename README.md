# Multiselect Troubleshooting

This is a sample solution for an issue I am having with the [Multiselect Component](https://shadcnui-expansions.typeart.cc/docs/multiple-selector) from [shadcn/ui expansions](https://shadcnui-expansions.typeart.cc/)

## Requirements

* Retrieves data from a remote source (API via React Query)
* Selections are stored in state by a component higher in the object structure
* Uses the `useForm` hook from [react-hook-form](https://react-hook-form.com/)

## Use Case

Users are creating a menu of items, each of which has a list of ingredients. The users selects the item they want to put on the menu and, in a separate component, those menu items will be used to generate a list of ingredients.

For this example, we're simply illustrating a form with the ability to select multiple items, but that is why we'll need the state of the selected items stored in a higher component.

## Testing Example

1. Open the application
2. Select `Filet Mignon` and `Grilled Salmon` as the menu items (both share `Salt` as an ingredient)
3. Adjust the quantities and notice that Salt is grouped together in the Menu Ingredients list
