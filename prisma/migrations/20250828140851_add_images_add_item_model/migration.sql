/*
  Warnings:

  - You are about to drop the column `image` on the `item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."item" DROP COLUMN "image",
ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "public"."item_image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "item_image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."item" ADD CONSTRAINT "item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."item_image" ADD CONSTRAINT "item_image_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
