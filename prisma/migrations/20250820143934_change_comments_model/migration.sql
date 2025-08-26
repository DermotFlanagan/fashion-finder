-- CreateTable
CREATE TABLE "public"."comment" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."comment" ADD CONSTRAINT "comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comment" ADD CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
