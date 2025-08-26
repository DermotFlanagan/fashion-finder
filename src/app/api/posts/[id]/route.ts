import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

// /api/posts/[id]: GET --- Used to fetch a single post by its ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Query the database for a post with the id from params
    const post = await prisma.post.findUnique({
      where: {
        id: params.id, // Get ID from URL params
      },
      include: {
        // Include the related user data, this is who created the post
        user: {
          select: {
            // Only grab these fields
            id: true,
            name: true,
            image: true,
          },
        },
        // Include all the likes on this post
        likes: {
          include: {
            // Also include the user who liked the post
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    // If there's no post with the this postID, return 404 error
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // On success, return the post data in json format
    return NextResponse.json(post);
  } catch (error) {
    // If there's an error, log it for debugging (server side)
    console.error("Error fetching post:", error);
    // Return generic error message to client
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// /api/posts/[id]: PUT --- Used to update an existing post by its ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if there's a user logged in
    const session = await auth.api.getSession({
      headers: request.headers, // Used to get session cookies and tokens
    });

    // If there is no session, the user isn't authenticated, so prevent anything further
    if (!session) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    // Get the data to be used
    const body = await request.json();
    const { title, body: content } = body; // Destructure the data into the two parts

    // Check each field has content
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Make sure the post exists
    const existingPost = await prisma.post.findUnique({
      where: { id: params.id },
      select: { userId: true },
    });

    // If not return relevant error
    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // If user is somehow attempting to edit someone else's post, return forbidden
    if (existingPost.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden: You can only edit your own posts" },
        { status: 403 }
      );
    }

    // Create updated post and update it in database
    const updatedPost = await prisma.post.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        body: content,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        likes: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    // Return the updated post
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
// /api/posts/[id]: DELETE --- Used to delete a single post by its ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authentication again
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    // Check post exists
    const existingPost = await prisma.post.findUnique({
      where: { id: params.id },
      select: { userId: true },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Make sure post is owned by the user querying
    if (existingPost.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden: You can only delete your own posts" },
        { status: 403 }
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: {
        id: params.id,
      },
    });

    // Relevant messages to return for each scenario
    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
