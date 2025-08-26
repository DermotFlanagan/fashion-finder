import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // If no user, early return
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    // Get user preference scores
    const userId = session.user.id;
    const userPreferences = await prisma.userPreference.findMany({
      where: { userId },
    });
    const preferenceMap = new Map();
    userPreferences.forEach((preference) => {
      preferenceMap.set(preference.categoryId, preference.score);
    });

    // Get all cards that haven't been swiped on by this user
    const unswipedItems = await prisma.item.findMany({
      where: {
        NOT: {
          swipes: {
            some: {
              userId,
            },
          },
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    // Score all unswiped items based on user preference scores
    const scoredItems = unswipedItems.map((item) => {
      let totalScore = 0;
      item.categories.forEach((categoryOnItem) => {
        const categoryScore = preferenceMap.get(categoryOnItem.categoryId) || 0;
        totalScore += categoryScore;
      });

      return {
        ...item,
        preferenceScore: totalScore,
      };
    });

    // Get top 10 scored items
    const topItems = scoredItems
      .sort((a, b) => b.preferenceScore - a.preferenceScore)
      .slice(0, 10);

    return NextResponse.json({ cards: topItems });
  } catch (err) {
    console.error("Error while fetching cards: ", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
