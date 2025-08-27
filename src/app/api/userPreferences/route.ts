// app/api/userPreferences/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {
  try {
    const { userId, likedCategories, dislikedCategories } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const categories = await prisma.category.findMany({
      where: {
        name: {
          in: [...(likedCategories || []), ...(dislikedCategories || [])],
        },
      },
    });

    const nameToId = categories.reduce((acc, cat) => {
      acc[cat.name] = cat.id;
      return acc;
    }, {} as Record<string, string>);

    const updates = [
      ...(likedCategories || []).map((name: string) => ({
        userId,
        categoryId: nameToId[name],
        score: 3,
      })),
      ...(dislikedCategories || []).map((name: string) => ({
        userId,
        categoryId: nameToId[name],
        score: -2,
      })),
    ];

    await Promise.all(
      updates.map((pref) =>
        prisma.userPreference.upsert({
          where: {
            userId_categoryId: {
              userId: pref.userId,
              categoryId: pref.categoryId,
            },
          },
          update: { score: pref.score },
          create: pref,
        })
      )
    );

    await prisma.user.update({
      where: { id: userId },
      data: { hasCompletedOnboarding: true },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
