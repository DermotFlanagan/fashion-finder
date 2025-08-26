-- CreateEnum
CREATE TYPE "public"."SwipeDirection" AS ENUM ('RIGHT', 'LEFT');

-- CreateTable
CREATE TABLE "public"."follow" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."swipe" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "direction" "public"."SwipeDirection" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "swipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "totalReviews" INTEGER NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."category_on_item" (
    "itemId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "category_on_item_pkey" PRIMARY KEY ("itemId","categoryId")
);

-- CreateTable
CREATE TABLE "public"."user_preference" (
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_preference_pkey" PRIMARY KEY ("userId","categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "follow_followerId_followingId_key" ON "public"."follow"("followerId", "followingId");

-- CreateIndex
CREATE INDEX "swipe_userId_createdAt_idx" ON "public"."swipe"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "swipe_itemId_createdAt_idx" ON "public"."swipe"("itemId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "swipe_userId_itemId_key" ON "public"."swipe"("userId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "public"."category"("name");

-- CreateIndex
CREATE INDEX "user_preference_userId_score_idx" ON "public"."user_preference"("userId", "score");

-- AddForeignKey
ALTER TABLE "public"."follow" ADD CONSTRAINT "follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."follow" ADD CONSTRAINT "follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."swipe" ADD CONSTRAINT "swipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."swipe" ADD CONSTRAINT "swipe_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."category_on_item" ADD CONSTRAINT "category_on_item_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."category_on_item" ADD CONSTRAINT "category_on_item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_preference" ADD CONSTRAINT "user_preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_preference" ADD CONSTRAINT "user_preference_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
