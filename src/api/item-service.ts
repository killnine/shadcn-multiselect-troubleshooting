import type {Item} from "@/types/item.ts";
import type {BillOfMaterials} from "@/types/ingredient.ts";

const dummyItems: Item[] = [
    {
        id: 1,
        name: "Mac & Cheese",
        description: "Kraft's finest blue box mac and cheese",
        price: 5.25,
        category: "Side Dish",
    },
    {
        id: 2,
        name: "Filet Mignon",
        description: "A delicious cut of beef",
        price: 17.95,
        category: "Main Course",
    },
    {
        id: 3,
        name: "Caesar Salad",
        description: "Crisp romaine lettuce with Caesar dressing",
        price: 8.50,
        category: "Salad",
    },
    {
        id: 4,
        name: "Chocolate Cake",
        description: "Rich chocolate cake with ganache",
        price: 6.75,
        category: "Dessert",
    },
    {
        id: 5,
        name: "Lobster Bisque",
        description: "Creamy lobster soup with a hint of sherry",
        price: 12.00,
        category: "Soup",
    },
    {
        id: 6,
        name: "Grilled Salmon",
        description: "Fresh salmon grilled to perfection",
        price: 15.50,
        category: "Main Course",
    },
    {
        id: 7,
        name: "Garlic Bread",
        description: "Toasted bread with garlic butter",
        price: 3.00,
        category: "Appetizer",
    },
    {
        id: 8,
        name: "Tiramisu",
        description: "Classic Italian coffee-flavored dessert",
        price: 7.25,
        category: "Dessert",
    },
    {
        id: 9,
        name: "Bruschetta",
        description: "Grilled bread topped with tomatoes and basil",
        price: 5.50,
        category: "Appetizer",
    },
    {
        id: 10,
        name: "Spaghetti Carbonara",
        description: "Pasta with creamy sauce, pancetta, and cheese",
        price: 11.75,
        category: "Main Course",
    },
    {
        id: 11,
        name: "Greek Salad",
        description: "Mixed greens with feta cheese and olives",
        price: 9.00,
        category: "Salad",
    },
    {
        id: 12,
        name: "Chicken Alfredo",
        description: "Fettuccine pasta with creamy Alfredo sauce and chicken",
        price: 13.50,
        category: "Main Course",
    },
    {
        id: 13,
        name: "Minestrone Soup",
        description: "Vegetable soup with pasta and beans",
        price: 4.75,
        category: "Soup",
    },
    {
        id: 14,
        name: "Caprese Salad",
        description: "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze",
        price: 8.25,
        category: "Salad",
    },
    {
        id: 15,
        name: "Cheeseburger",
        description: "Juicy beef burger with cheese, lettuce, and tomato",
        price: 10.50,
        category: "Main Course",
    }
]

const dummyIngredients: BillOfMaterials[] = [
    {
        name: "Mac & Cheese Recipe",
        itemId: 1,
        yield: 1,
        ingredients: [
            { name: "Macaroni", quantity: 2 },
            { name: "Cheese powder", quantity: 1 },
            { name: "Butter", quantity: 0.5 }
        ]
    },
    {
        name: "Filet Mignon Recipe",
        itemId: 2,
        yield: 1,
        ingredients: [
            { name: "Beef tenderloin", quantity: 1 },
            { name: "Salt", quantity: 0.1 },
            { name: "Black pepper", quantity: 0.1 }
        ]
    },
    {
        name: "Caesar Salad Recipe",
        itemId: 3,
        yield: 2,
        ingredients: [
            { name: "Romaine lettuce", quantity: 1 },
            { name: "Caesar dressing", quantity: 0.5 },
            { name: "Croutons", quantity: 0.25 }
        ]
    },
    {
        name: "Chocolate Cake Recipe",
        itemId: 4,
        yield: 8,
        ingredients: [
            { name: "Flour", quantity: 2 },
            { name: "Cocoa powder", quantity: 0.5 },
            { name: "Sugar", quantity: 1 }
        ]
    },
    {
        name: "Lobster Bisque Recipe",
        itemId: 5,
        yield: 4,
        ingredients: [
            { name: "Lobster", quantity: 1 },
            { name: "Heavy cream", quantity: 2 },
            { name: "Sherry", quantity: 0.25 }
        ]
    },
    {
        name: "Grilled Salmon Recipe",
        itemId: 6,
        yield: 1,
        ingredients: [
            { name: "Salmon fillet", quantity: 1 },
            { name: "Lemon", quantity: 0.5 },
            { name: "Salt", quantity: 0.1 }
        ]
    },
    {
        name: "Garlic Bread Recipe",
        itemId: 7,
        yield: 6,
        ingredients: [
            { name: "French bread", quantity: 1 },
            { name: "Butter", quantity: 0.5 },
            { name: "Garlic", quantity: 3 }
        ]
    },
    {
        name: "Tiramisu Recipe",
        itemId: 8,
        yield: 6,
        ingredients: [
            { name: "Mascarpone cheese", quantity: 1 },
            { name: "Ladyfingers", quantity: 24 },
            { name: "Coffee", quantity: 2 }
        ]
    },
    {
        name: "Bruschetta Recipe",
        itemId: 9,
        yield: 4,
        ingredients: [
            { name: "French bread", quantity: 1 },
            { name: "Tomatoes", quantity: 3 },
            { name: "Basil", quantity: 0.25 }
        ]
    },
    {
        name: "Spaghetti Carbonara Recipe",
        itemId: 10,
        yield: 2,
        ingredients: [
            { name: "Spaghetti", quantity: 1 },
            { name: "Pancetta", quantity: 0.5 },
            { name: "Parmesan cheese", quantity: 0.25 }
        ]
    }
];

export const fetchItems = (searchTerm: string): Item[] => {
    const searchTermLower = searchTerm.toLowerCase();

    if (!searchTermLower) {
        return dummyItems.slice(0, 3);
    }

    return dummyItems.filter(item =>
        item.name.toLowerCase().includes(searchTermLower) ||
        item.description.toLowerCase().includes(searchTermLower)
    ).slice(0, 3);
}

export const fetchItemsByIds = (ids: number[]): Item[] => {
    return dummyItems.filter(item => ids.includes(item.id));
}

export const fetchIngredientsByItemIdsAndQuantity = (itemQuantities: {itemId: number, quantity: number}[]): ({ ingredientName: string, quantity: number})[] => {
    const ingredientsMap: Record<string, number> = {};

    itemQuantities.forEach(({ itemId, quantity }) => {
        const bom = dummyIngredients.find(b => b.itemId === itemId);
        if (bom) {
            bom.ingredients.forEach(ing => {
                const totalQty = (ing.quantity * quantity) / bom.yield;
                ingredientsMap[ing.name] = (ingredientsMap[ing.name] || 0) + totalQty;
            });
        }
    });

    return Object.entries(ingredientsMap).map(([ingredientName, quantity]) => ({
        ingredientName,
        quantity,
    }));
}
