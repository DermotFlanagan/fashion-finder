/*
  Warnings:

  - You are about to drop the column `totalLikes` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."post" DROP COLUMN "totalLikes";

-- CreateTable
CREATE TABLE "public"."like" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "like_postId_userId_key" ON "public"."like"("postId", "userId");

-- AddForeignKey
ALTER TABLE "public"."like" ADD CONSTRAINT "like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."like" ADD CONSTRAINT "like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
