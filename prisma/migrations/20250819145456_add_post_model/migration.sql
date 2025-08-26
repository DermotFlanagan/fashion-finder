-- CreateTable
CREATE TABLE "public"."post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "totalLikes" INTEGER NOT NULL DEFAULT 0,
    "totalComments" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."post" ADD CONSTRAINT "post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
