import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("|| STARTING SEED ||");

  const categories = [
    "jacket",
    "dress",
    "t-shirt",
    "shirt",
    "shoes",
    "bag",
    "glasses",
    "trousers",
    "sunglasses",
    "shorts",
    "jumper",
    "jeans",
    "hoodie",
    "scarf",
    "black",
    "white",
    "blue",
    "green",
    "brown",
    "red",
    "yellow",
    "grey",
    "orange",
    "leather",
    "cotton",
    "denim",
    "wool",
    "silk",
    "linen",
    "vintage",
    "modern",
    "formal",
    "casual",
    "recycled",
    "handmade",
  ];

  console.log("|| CREATING CATEGORIES ||");
  const createdCategories = await Promise.all(
    categories.map((name) =>
      prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  console.log(`|| ${createdCategories.length} CATEGORIES CREATED`);

  const itemsData = [
    {
      name: "Vintage Black Leather Jacket",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      rating: 4.5,
      totalReviews: 127,
      categories: ["jacket", "black", "leather", "vintage"],
    },
    {
      name: "Blue Denim Jeans",
      price: 45.0,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
      rating: 4.2,
      totalReviews: 89,
      categories: ["trousers", "blue", "denim"],
    },
    {
      name: "White Cotton T-Shirt",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      rating: 4.0,
      totalReviews: 203,
      categories: ["shirt", "white", "cotton", "casual"],
    },
    {
      name: "Trainers",
      price: 120.0,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      rating: 4.8,
      totalReviews: 156,
      categories: ["shoes", "red", "casual"],
    },
    {
      name: "Elegant Red Silk Dress",
      price: 75.5,
      image:
        "https://images.unsplash.com/photo-1576757782865-f4ca733be1ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHJlZCUyMGRyZXNzfGVufDB8fDB8fHww",
      rating: 4.6,
      totalReviews: 67,
      categories: ["dress", "red", "silk", "formal"],
    },
    {
      name: "Grey Wool Jumper",
      price: 55.0,
      image:
        "https://images.unsplash.com/photo-1692221271229-27dc0d3f9ca3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.3,
      totalReviews: 94,
      categories: ["jumper", "grey", "wool", "casual"],
    },
    {
      name: "Blue backpack",
      price: 95.0,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      rating: 4.7,
      totalReviews: 78,
      categories: ["bag", "blue", "casual"],
    },
    {
      name: "Grey Hoodie",
      price: 65.0,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
      rating: 4.4,
      totalReviews: 112,
      categories: ["hoodie", "grey", "casual"],
    },
    {
      name: "Vintage Denim Jacket",
      price: 78.99,
      image:
        "https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.5,
      totalReviews: 145,
      categories: ["jacket", "blue", "denim", "vintage"],
    },
    {
      name: "White Trainers",
      price: 85.0,
      image:
        "https://images.unsplash.com/photo-1617659512089-6fdec6c54406?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.1,
      totalReviews: 89,
      categories: ["shoes", "white", "casual"],
    },
    {
      name: "Organic Cotton T-Shirt",
      categories: ["cotton", "t-shirt", "white"],
      image:
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 25.3,
      rating: 3.6,
      totalReviews: 43,
    },
    {
      name: "Recycled Denim Jeans",
      categories: ["denim", "recycled", "jeans", "blue"],
      image:
        "https://images.unsplash.com/photo-1714729382668-7bc3bb261662?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 60.2,
      rating: 3.7,
      totalReviews: 66,
    },
    {
      name: "Wool Jumper",
      categories: ["wool", "jumper", "grey"],
      image:
        "https://images.unsplash.com/photo-1631541909061-71e349d1f203?q=80&w=705&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 90.53,
      rating: 4.2,
      totalReviews: 23,
    },
    {
      name: "Sunglasses",
      categories: ["vintage", "glasses", "sunglasses", "black"],
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 45,
      rating: 1.4,
      totalReviews: 90,
    },
    {
      name: "Leather Bag",
      categories: ["handmade", "leather", "brown", "bag"],
      image:
        "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?q=80&w=1274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 150.01,
      rating: 4.1,
      totalReviews: 31,
    },
    {
      name: "Scarf",
      categories: ["scarf"],
      image:
        "https://images.unsplash.com/photo-1609803384069-19f3e5a70e75?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 35.54,
      rating: 4.1,
      totalReviews: 5,
    },
  ];

  console.log("|| CREATING ITEMS ||");
  for (const itemData of itemsData) {
    const { categories: categoryNames, ...itemInfo } = itemData;

    const item = await prisma.item.create({
      data: itemInfo,
    });

    for (const categoryName of categoryNames) {
      const category = createdCategories.find((c) => c.name === categoryName);
      if (category) {
        await prisma.categoryOnItem.create({
          data: {
            itemId: item.id,
            categoryId: category.id,
          },
        });
      }
    }

    console.log(`Created item: ${item.name}`);
  }

  console.log("|| SEED COMPLETE ||");
}

main()
  .catch((e) => {
    console.error("!! SEED FAILED !!: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
