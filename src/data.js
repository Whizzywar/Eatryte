// Put your original images in /public/Images (same file names), or edit the paths here.
export const IMG = {
  // Hero banner background. Change this path to use your own banner image.
  hero: "/Images/photo-1568901346375-23c9450c58cd.jpeg",
  burger: "/Images/photo-1568901346375-23c9450c58cd.jpeg",
  bread: "/Images/tamas-pap-becv0VQgAKU-unsplash.jpg",
  snack: "/Images/geri-chapple-fXdoHjQ2Pyg-unsplash.jpg",
  pasta: "/Images/mae-mu-Pvclb-iHHYY-unsplash.jpg",
};

export const NAV = [
  ["Our Story", "/our-story"],
  ["Our Menu", "/menu"],
  ["Gallery", "/gallery"],
  ["Blog", "/blog"],
  ["Contact Us", "/contact"],
];

export const CATEGORIES = ["All", "Chicken & Rice", "Bread & Cake", "Burgers & Pies", "Pizza & Shawarma"];

export const MENU = [
  { id: 1, name: "Grilled Chicken & Rice", cat: "Chicken & Rice", price: 4500, img: IMG.pasta, note: "Grilled chicken, garnished rice, savory vegetables." },
  { id: 2, name: "Chicken & Pepper Sauce", cat: "Chicken & Rice", price: 3800, img: IMG.snack, note: "Crispy chicken with our slow-cooked pepper sauce." },
  { id: 3, name: "Fresh Sliced Bread", cat: "Bread & Cake", price: 1800, img: IMG.bread, note: "Baked this morning by our bakers." },
  { id: 4, name: "Celebration Cake Slice", cat: "Bread & Cake", price: 2200, img: IMG.bread, note: "Soft, fluffy and just sweet enough." },
  { id: 5, name: "Classic Beef Burger", cat: "Burgers & Pies", price: 3500, img: IMG.burger, note: "Flame-grilled patty, fresh salad, toasted bun." },
  { id: 6, name: "Chicken Pie", cat: "Burgers & Pies", price: 1500, img: IMG.snack, note: "Buttery crust, creamy chicken filling." },
  { id: 7, name: "Suya Shawarma", cat: "Pizza & Shawarma", price: 3200, img: IMG.burger, note: "Spiced suya meat, cabbage, creamy sauce." },
  { id: 8, name: "Pepperoni Pizza", cat: "Pizza & Shawarma", price: 6500, img: IMG.pasta, note: "Hand-stretched base, stone-baked." },
];

export const POSTS = [
  {
    slug: "why-fresh-bread-matters",
    title: "Why fresh bread changes everything",
    date: "12 October 2026",
    img: IMG.bread,
    excerpt: "A loaf baked this morning tastes different. Here is how our bakers make it happen.",
    body: [
      "Our bakers start before sunrise so that every loaf on the shelf was baked that morning.",
      "Fresh bread is softer, fluffier and keeps its flavour. That is why we bake in small batches all day instead of one big batch at dawn.",
      "Stop by around midday and you will catch a second batch coming out of the oven.",
    ],
  },
  {
    slug: "quick-lunch-for-busy-days",
    title: "A quick lunch for busy days",
    date: "28 September 2026",
    img: IMG.snack,
    excerpt: "No time to sit down? Our grab-and-go picks keep you full until evening.",
    body: [
      "Everyone has to eat, however busy the day is. Our pies, shawarma and burgers are made to be eaten on the move.",
      "Order ahead and your food will be ready when you arrive. Eatryte before you shoprite!",
    ],
  },
  {
    slug: "chicken-and-rice-done-right",
    title: "Chicken and rice, done right",
    date: "9 September 2026",
    img: IMG.pasta,
    excerpt: "Simple food made carefully: what goes into our most-ordered plate.",
    body: [
      "Our chicken is grilled fresh to order and served with well-garnished rice and savory vegetables.",
      "The secret is patience: slow seasoning, a hot grill and rice cooked in proper stock.",
    ],
  },
];
