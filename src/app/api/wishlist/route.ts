import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId, itemId } = await request.json();

    if (!userId || !itemId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existing = await prisma.wishlist.findUnique({
      where: {
        userId_itemId: { userId, itemId },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Item already wishlisted" },
        { status: 400 }
      );
    }

    const wishlistedItem = await prisma.wishlist.create({
      data: {
        itemId,
        userId,
      },
    });

    return NextResponse.json(wishlistedItem, { status: 201 });
  } catch (err) {
    console.error("Error wishlisting item:", err);
    return NextResponse.json(
      { error: "Failed to wishlist item" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    const userId = session.user.id;
    const { itemId } = await req.json();

    if (!itemId) {
      return NextResponse.json({ error: "Missing itemId" }, { status: 400 });
    }

    const existing = await prisma.wishlist.findUnique({
      where: {
        userId_itemId: { userId, itemId },
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    await prisma.wishlist.delete({
      where: {
        userId_itemId: { userId, itemId },
      },
    });

    return NextResponse.json(
      { message: "Item un-wishlisted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting wishlisted item", err);
    return NextResponse.json(
      { error: "Failed to unwishlist item" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    const userId = session.user.id;

    const wishlist = await prisma.wishlist.findMany({
      where: { userId },
      include: {
        item: {
          include: {
            images: true,
            categories: {
              include: {
                category: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(wishlist);
  } catch (err) {
    console.error("Error while fetching wishlist", err);
    return NextResponse.json(
      { error: "Failed ot fetch wishlist" },
      { status: 500 }
    );
  }
}
