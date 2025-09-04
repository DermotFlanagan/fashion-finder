-- CreateTable
CREATE TABLE "public"."wishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "wishlist_userId_createdAt_idx" ON "public"."wishlist"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "wishlist_userId_itemId_key" ON "public"."wishlist"("userId", "itemId");

-- AddForeignKey
ALTER TABLE "public"."wishlist" ADD CONSTRAINT "wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."wishlist" ADD CONSTRAINT "wishlist_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
