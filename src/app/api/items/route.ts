import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { toNamespacedPath } from "node:path/win32";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    const body = await request.json();
    const { title: name, price, images, categories } = body;

    if (!name || price == null || !images?.length || !categories?.length) {
      return NextResponse.json(
        { error: "Missing requires attributes" },
        { status: 400 }
      );
    }

    const post = await prisma.item.create({
      data: {
        name,
        price,
        categories: {
          create: categories.map((categoryId: string) => ({
            category: { connect: { id: categoryId } },
          })),
        },
        images: {
          create: images.map((url: string) => ({ url })),
        },
        userId: session.user.id,
        rating: 0,
        totalReviews: 0,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        images: true,
        categories: {
          include: { category: true },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
