export type Category = "All" | "Signature Drinks" | "Slow Bar" | "House Pastries" | "Kitchen";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: Exclude<Category, "All">;
  description: string;
  image: string;
  hasMilkOption?: boolean;
}

export const CATEGORIES: Category[] = [
  "All",
  "Signature Drinks",
  "Slow Bar",
  "House Pastries",
  "Kitchen",
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "s1", name: "Oat Milk Latte", price: 7, category: "Signature Drinks",
    description: "House-pulled espresso, steamed oat milk, a whisper of cane.",
    image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&q=80",
    hasMilkOption: true,
  },
  {
    id: "s2", name: "Iced Matcha", price: 7, category: "Signature Drinks",
    description: "Ceremonial grade matcha, cold oat milk, lightly sweetened.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80",
    hasMilkOption: true,
  },
  {
    id: "s3", name: "Cardamom Rose Latte", price: 8, category: "Signature Drinks",
    description: "Espresso, whole milk, cardamom syrup, dried rose.",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80",
    hasMilkOption: true,
  },
  {
    id: "s4", name: "Cold Brew Tonic", price: 7, category: "Signature Drinks",
    description: "18-hour cold brew over tonic water, orange peel.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
  },
  {
    id: "b1", name: "Single Origin Pour-Over", price: 6, category: "Slow Bar",
    description: "Rotating single-origin selection, brewed to order on the Kalita Wave.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
  },
  {
    id: "b2", name: "Espresso", price: 4, category: "Slow Bar",
    description: "A precise 28g shot, pulled from our seasonal house blend.",
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&q=80",
  },
  {
    id: "b3", name: "Cortado", price: 5, category: "Slow Bar",
    description: "Equal parts espresso and warm milk. Nothing hidden.",
    image: "https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=600&q=80",
    hasMilkOption: true,
  },
  {
    id: "b4", name: "Aeropress Single", price: 6, category: "Slow Bar",
    description: "Immersion-brewed for full body and clarity. Served black.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80",
  },
  {
    id: "p1", name: "Butter Croissant", price: 5, category: "House Pastries",
    description: "72-hour laminated dough. Shatteringly crisp. Deeply buttery.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
  },
  {
    id: "p2", name: "Almond Croissant", price: 6, category: "House Pastries",
    description: "Day-old croissant soaked in syrup, filled with frangipane.",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=600&q=80",
  },
  {
    id: "p3", name: "Morning Bun", price: 5, category: "House Pastries",
    description: "Brioche dough, cinnamon-orange sugar, rolled and baked to order.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
  },
  {
    id: "p4", name: "Cardamom Knot", price: 5, category: "House Pastries",
    description: "Scandinavian-style, heavy on the cardamom, light on the glaze.",
    image: "https://images.unsplash.com/photo-1568471173242-461f0a730452?w=600&q=80",
  },
  {
    id: "k1", name: "Avocado Toast", price: 14, category: "Kitchen",
    description: "Sourdough, whipped ricotta, smashed avocado, chili flake, microgreens.",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=600&q=80",
  },
  {
    id: "k2", name: "Grain Bowl", price: 16, category: "Kitchen",
    description: "Farro, roasted seasonal vegetables, tahini, soft egg, dukkah.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
  },
  {
    id: "k3", name: "Smoked Salmon Bagel", price: 15, category: "Kitchen",
    description: "House-baked bagel, whipped cream cheese, capers, dill, shallot.",
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&q=80",
  },
  {
    id: "k4", name: "Seasonal Soup", price: 12, category: "Kitchen",
    description: "Ask your server. Changes weekly with what's best at the market.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
  },
];
