import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = parseInt(searchParams.get("limit") || "10");

    const popularItems = await prisma.item.findMany({
      include: {
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
        _count: {
          select: {
            wishlist: true,
          },
        },
      },
      orderBy: {
        wishlist: {
          _count: "desc",
        },
      },
      take: limit,
    });

    return NextResponse.json(popularItems);
  } catch (err) {
    console.error("Error while fetching popular items: ", err);
    return NextResponse.json(
      { error: "Failed to fetch popular items" },
      { status: 500 }
    );
  }
}
