import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // console.log("|| STARTING SEED ||");

  // const categories = [
  //   "jacket",
  //   "dress",
  //   "t-shirt",
  //   "shirt",
  //   "shoes",
  //   "bag",
  //   "glasses",
  //   "trousers",
  //   "sunglasses",
  //   "shorts",
  //   "jumper",
  //   "jeans",
  //   "hoodie",
  //   "scarf",
  //   "black",
  //   "white",
  //   "blue",
  //   "green",
  //   "brown",
  //   "red",
  //   "yellow",
  //   "grey",
  //   "orange",
  //   "leather",
  //   "cotton",
  //   "denim",
  //   "wool",
  //   "silk",
  //   "linen",
  //   "vintage",
  //   "modern",
  //   "formal",
  //   "casual",
  //   "recycled",
  //   "handmade",
  // ];

  // console.log("|| CREATING CATEGORIES ||");
  // const createdCategories = await Promise.all(
  //   categories.map((name) =>
  //     prisma.category.upsert({
  //       where: { name },
  //       update: {},
  //       create: { name },
  //     })
  //   )
  // );

  // console.log(`|| ${createdCategories.length} CATEGORIES CREATED`);

  const createdCategories = await prisma.category.findMany();

  const itemsData = [
    {
      name: "Blue denim jacket",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1527016021513-b09758b777bd?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.3,
      totalReviews: 110,
      categories: ["jacket", "blue", "denim", "casual"],
    },
    {
      name: "Red t-shirt",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1755445412764-340a85dcaf78?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.0,
      totalReviews: 95,
      categories: ["t-shirt", "red", "cotton", "casual"],
    },
    {
      name: "Black leather shoes",
      price: 150.0,
      image:
        "https://images.unsplash.com/photo-1605732440685-d0654d81aa30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.7,
      totalReviews: 180,
      categories: ["shoes", "black", "leather", "formal"],
    },
    {
      name: "Green cotton shirt",
      price: 39.99,
      image:
        "https://plus.unsplash.com/premium_photo-1723549679906-861225f57286?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JlZW4lMjBjb3R0b24lMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
      rating: 4.1,
      totalReviews: 75,
      categories: ["shirt", "green", "cotton", "casual"],
    },
    {
      name: "Beige linen trousers",
      price: 65.0,
      image:
        "https://images.unsplash.com/photo-1638396637969-956ca903df87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmVpZ2UlMjBsaW5lbiUyMHRyb3VzZXJzfGVufDB8fDB8fHww",
      rating: 4.2,
      totalReviews: 60,
      categories: ["trousers", "beige", "linen", "casual"],
    },
    {
      name: "White sneakers",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1722489292294-426912777649?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.5,
      totalReviews: 200,
      categories: ["shoes", "white", "casual", "recycled"],
    },
    {
      name: "Black hoodie",
      price: 55.0,
      image:
        "https://plus.unsplash.com/premium_photo-1673356301340-4522591be5f7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.3,
      totalReviews: 130,
      categories: ["hoodie", "black", "casual"],
    },
    {
      name: "Yellow cotton dress",
      price: 65.0,
      image:
        "https://images.unsplash.com/photo-1620509501621-2d6ef1dbfde4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8WWVsbG93JTIwY290dG9uJTIwZHJlc3N8ZW58MHx8MHx8fDA%3D",
      rating: 4.6,
      totalReviews: 80,
      categories: ["dress", "yellow", "cotton", "casual"],
    },
    {
      name: "Brown leather bag",
      price: 120.0,
      image:
        "https://images.unsplash.com/photo-1622560482379-c9813322e95a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEJyb3duJTIwbGVhdGhlciUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
      rating: 4.8,
      totalReviews: 95,
      categories: ["bag", "brown", "leather", "formal"],
    },
    {
      name: "Orange jumper",
      price: 35.0,
      image:
        "https://plus.unsplash.com/premium_photo-1726930176449-388f0bced974?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8T3JhbmdlJTIwanVtcGVyfGVufDB8fDB8fHww",
      rating: 3.9,
      totalReviews: 50,
      categories: ["jumper", "orange", "cotton", "casual"],
    },
    {
      name: "Blue scarf",
      price: 25.0,
      image:
        "https://plus.unsplash.com/premium_photo-1663099488842-53384bf9c6b3?q=80&w=1230&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.4,
      totalReviews: 40,
      categories: ["scarf", "blue", "wool", "handmade"],
    },
    {
      name: "Red formal shirt",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1691010376539-fef5efe07975?q=80&w=722&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.5,
      totalReviews: 70,
      categories: ["shirt", "red", "cotton", "formal"],
    },
    {
      name: "Green jeans",
      price: 55.0,
      image:
        "https://plus.unsplash.com/premium_photo-1740354613211-ba0ef46452f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fGdyZWVuJTIwamVhbnN8ZW58MHx8MHx8fDA%3D",
      rating: 4.0,
      totalReviews: 110,
      categories: ["jeans", "green", "denim", "casual"],
    },
    {
      name: "Black formal trousers",
      price: 75.0,
      image:
        "https://plus.unsplash.com/premium_photo-1673287635935-66e9540e0d8e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.6,
      totalReviews: 120,
      categories: ["trousers", "black", "formal", "wool"],
    },
    {
      name: "White silk blouse",
      price: 65.0,
      image:
        "https://images.unsplash.com/photo-1616897259399-ed20b6c17ec8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFdoaXRlJTIwc2lsayUyMGJsb3VzZXxlbnwwfHwwfHx8MA%3D%3D",
      rating: 4.7,
      totalReviews: 90,
      categories: ["shirt", "white", "silk", "formal"],
    },
    {
      name: "Blue cotton t-shirt",
      price: 22.0,
      image:
        "https://images.unsplash.com/photo-1621951767587-b24334f11c65?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.1,
      totalReviews: 60,
      categories: ["t-shirt", "blue", "cotton", "casual"],
    },
    {
      name: "Brown leather shoes",
      price: 140.0,
      image:
        "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?q=80&w=1190&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.8,
      totalReviews: 150,
      categories: ["shoes", "brown", "leather", "formal"],
    },
    {
      name: "Grey hoodie",
      price: 50.0,
      image:
        "https://images.unsplash.com/photo-1667586680656-6b8e381cddb5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.2,
      totalReviews: 100,
      categories: ["hoodie", "grey", "casual"],
    },
    {
      name: "Purple cotton dress",
      price: 70.0,
      image:
        "https://images.unsplash.com/photo-1626818590159-04cb9274a5e0?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.3,
      totalReviews: 55,
      categories: ["dress", "purple", "cotton", "formal"],
    },
    {
      name: "White wool jumper",
      price: 60.0,
      image:
        "https://images.unsplash.com/photo-1620832400588-e8f89b5a5925?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.5,
      totalReviews: 80,
      categories: ["jumper", "white", "wool", "casual"],
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
