import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get required info
    const { userId, itemId, direction } = await request.json();

    // Return early if any is missing
    if (!userId || !itemId || !direction) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Make sure direction is valid
    if (direction !== "RIGHT" && direction !== "LEFT") {
      return NextResponse.json(
        { error: "direction must be RIGHT or LEFT" },
        { status: 400 }
      );
    }

    // Check the item hasn't already been swiped (should be covered prior to fetching cards)
    const existingSwipe = await prisma.swipe.findUnique({
      where: {
        userId_itemId: { userId, itemId },
      },
    });

    if (existingSwipe) {
      return NextResponse.json(
        { error: "Item already swiped" },
        { status: 400 }
      );
    }

    // Get item info
    const item = await prisma.item.findUnique({
      where: { id: itemId },
      include: {
        categories: { include: { category: true } },
      },
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const scoreChange = direction === "RIGHT" ? 1 : -1;
    const categoryIds = item.categories.map((c) => c.categoryId);

    const result = await prisma.$transaction(async (tx) => {
      // Record swipe
      const swipe = await tx.swipe.create({
        data: { userId, itemId, direction },
      });

      // Get user preferences
      const existingPrefs = await tx.userPreference.findMany({
        where: {
          userId,
          categoryId: { in: categoryIds },
        },
      });

      const existingMap = new Map(
        existingPrefs.map((pref) => [pref.categoryId, pref])
      );

      // Update categories with clamping (or create if it doesn't exist in user preferences yet)
      for (const catId of categoryIds) {
        const existing = existingMap.get(catId);
        if (existing) {
          const newScore = Math.max(
            -15,
            Math.min(15, existing.score + scoreChange)
          );
          await tx.userPreference.update({
            where: {
              userId_categoryId: { userId, categoryId: catId },
            },
            data: { score: newScore },
          });
        } else {
          const initialScore = Math.max(-15, Math.min(15, scoreChange));
          await tx.userPreference.create({
            data: {
              userId,
              categoryId: catId,
              score: initialScore,
            },
          });
        }
      }

      return swipe;
    });

    return NextResponse.json({
      success: true,
      swipe: result,
      message: `Swipe recorded and preferences updated for ${item.categories.length} categories`,
    });
  } catch (err) {
    console.error("Error while recording swipe: ", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
