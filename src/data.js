// Put your original images in /public/Images (same file names), or edit the paths here.
export const IMG = {
  // page header banner background. Change this path to use your own banner image.
  hero: "/Images/istockphoto-1363638825-612x612.jpg",
  burger: "/Images/photo-1568901346375-23c9450c58cd.jpeg",
  bread: "/Images/tamas-pap-becv0VQgAKU-unsplash.jpg",
  snack: "/Images/jonathan-pielmayer-Gn64mz9hTqE-unsplash.jpg",
  story: "/Images/photo-1612927601601-6638404737ce.jpeg",
  storysection: "/Images/photo-1612927601601-6638404737ce.jpeg",
  banner: "/Images/istockphoto-1363638825-612x612.jpg",
  pizza: "/Images/jonathan-pielmayer-Gn64mz9hTqE-unsplash.jpg",
  pasta: "/Images/mae-mu-Pvclb-iHHYY-unsplash.jpg",
  menu1: "/Images/olayinka-babalola-r01ZopTiEV8-unsplash.jpg",
  menu2: "/Images/nathan-dumlao-8Uv6eanQWzY-unsplash.jpg",
  menu3: "/Images/charles-chen-w2ZFjDnUL3w-unsplash.jpg",
  menu4: "/Images/photo-1565958011703-44f9829ba187.jpeg",
  menu5: "/Images/photo-1568901346375-23c9450c58cd.jpeg",
  menu6: "/Images/scott-eckersley-bXP4ijL9BrY-unsplash.jpg",
  menu7: "/Images/elena-leya-lWliLLBMU3I-unsplash.jpg",
  menu8: "/Images/pranjall-kumar-sejqj6Eaqe8-unsplash.jpg",
};

export const NAV = [
  ["Our Story", "/our-story"],
  ["Our Menu", "/menu"],
  ["Gallery", "/gallery"],
  ["Blog", "/blog"],
  ["Contact Us", "/contact"],
];

export const CATEGORIES = [
  "All",
  "Chicken & Rice",
  "Bread & Cake",
  "Burgers & Pies",
  "Pizza & Shawarma",
];

export const MENU = [
  {
    id: 1,
    name: "Grilled Chicken & Rice",
    cat: "Chicken & Rice",
    price: 4500,
    img: IMG.menu1,
    note: "Grilled chicken, garnished rice, savory vegetables.",
  },
  {
    id: 2,
    name: "Chicken & Pepper Sauce",
    cat: "Chicken & Rice",
    price: 3800,
    img: IMG.menu2,
    note: "Crispy chicken with our slow-cooked pepper sauce.",
  },
  {
    id: 3,
    name: "Fresh Sliced Bread",
    cat: "Bread & Cake",
    price: 1800,
    img: IMG.menu3,
    note: "Baked this morning by our bakers.",
  },
  {
    id: 4,
    name: "Celebration Cake Slice",
    cat: "Bread & Cake",
    price: 2200,
    img: IMG.menu4,
    note: "Soft, fluffy and just sweet enough.",
  },
  {
    id: 5,
    name: "Classic Beef Burger",
    cat: "Burgers & Pies",
    price: 3500,
    img: IMG.menu5,
    note: "Flame-grilled patty, fresh salad, toasted bun.",
  },
  {
    id: 6,
    name: "Meat Pie",
    cat: "Burgers & Pies",
    price: 1500,
    img: IMG.menu6,
    note: "Buttery crust, creamy meat filling.",
  },
  {
    id: 7,
    name: "Suya Shawarma",
    cat: "Pizza & Shawarma",
    price: 3200,
    img: IMG.menu7,
    note: "Spiced suya meat, cabbage, creamy sauce.",
  },
  {
    id: 8,
    name: "Pepperoni Pizza",
    cat: "Pizza & Shawarma",
    price: 6500,
    img: IMG.menu8,
    note: "Hand-stretched base, stone-baked.",
  },
];

export const POSTS = [
  {
    slug: "why-fresh-bread-matters",
    title: "Why fresh bread changes everything",
    date: "12 October 2026",
    img: IMG.bread,
    excerpt:
      "A loaf baked this morning tastes different. Here is how our bakers make it happen.",
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
    excerpt:
      "No time to sit down? Our grab-and-go picks keep you full until evening.",
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
    excerpt:
      "Simple food made carefully: what goes into our most-ordered plate.",
    body: [
      "Our chicken is grilled fresh to order and served with well-garnished rice and savory vegetables.",
      "The secret is patience: slow seasoning, a hot grill and rice cooked in proper stock.",
    ],
  },
];
