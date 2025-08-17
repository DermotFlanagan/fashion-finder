"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, Trash } from "lucide-react";

interface Card {
  id: number;
  image: string;
  title: string;
  categories: string[];
  price: number;
  reviews: number;
}

export default function WishlistPage() {
  const { data: session } = useSession();
  const [wishlist, setWishlist] = useState<Card[]>([]);

  useEffect(function () {
    const wishlist = localStorage.getItem("wishlist");
    if (wishlist) {
      setWishlist(JSON.parse(wishlist));
    }
  }, []);

  if (!session) {
    return <div>Loading session...</div>;
  }

  function handleDelete(itemId: number) {
    const updatedWishlist = wishlist.filter((item) => item.id !== itemId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/50 shadow-lg ring-1 ring-white/15 px-8 py-10 rounded-3xl backdrop-blur-2xl w-full max-w-6xl max-h-[80vh] flex flex-col">
        <div className="flex items-center gap-4 mb-8 flex-shrink-0">
          <Link href="/account">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">Wishlist</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {wishlist.length === 0 ? (
            <div className="flex flex-col text-center py-16">
              <h1 className="text-3xl mb-2">😭</h1>
              <h2 className="text-3xl font-semibold mb-2">
                No wishlisted items
              </h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition group"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div
                      className="rounded-full bg-red-500 opacity-0 absolute top-2 right-2 p-2 group-hover:opacity-100 shadow-lg text-neutral-100 hover:bg-red-700 transition cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash size={24} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
