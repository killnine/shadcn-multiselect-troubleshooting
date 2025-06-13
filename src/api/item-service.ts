import type {Item} from "@/types/item.ts";

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
