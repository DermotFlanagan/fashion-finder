"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trash } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "@/app/components/ui/Spinner";

interface WishlistItem {
  id: string;
  userId: string;
  itemId: string;
  createdAt: string;
  item: {
    id: string;
    name: string;
    price: number;
    rating: number;
    totalReviews: number;
    images: { id: string; url: string; itemId: string }[];
    categories: {
      category: {
        id: string;
        name: string;
      };
    }[];
  };
}

export default function WishlistPage() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: wishlist = [], isLoading } = useQuery<WishlistItem[]>({
    queryKey: ["wishlist"],
    queryFn: async function () {
      const response = await fetch("/api/wishlist");
      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }
      return response.json();
    },
    enabled: !!session,
  });

  const deleteWishlistedItem = useMutation({
    mutationFn: async function (itemId: string) {
      const response = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete item from wishlist");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  if (!session || isLoading) {
    return <Spinner />;
  }

  function handleDelete(itemId: string) {
    deleteWishlistedItem.mutate(itemId);
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white/50 shadow-lg ring-1 ring-white/15 px-8 py-10 rounded-3xl backdrop-blur-2xl w-full max-w-6xl max-h-[80vh] flex flex-col">
        <div className="flex items-center gap-4 mb-8 flex-shrink-0">
          <Link href="/app">
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
              {wishlist.map((wishlistItem) => (
                <div
                  key={wishlistItem.id}
                  className="rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition group"
                >
                  <div className="aspect-square relative w-48 h-48">
                    <Image
                      src={wishlistItem.item.images[0]?.url || ""}
                      alt={wishlistItem.item.name}
                      fill
                      className="object-cover"
                    />
                    <div
                      className={`rounded-full bg-red-500 opacity-0 absolute top-2 right-2 p-2 group-hover:opacity-100 shadow-lg text-neutral-100 hover:bg-red-700 transition cursor-pointer ${
                        deleteWishlistedItem.isPending
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() =>
                        !deleteWishlistedItem.isPending &&
                        handleDelete(wishlistItem.item.id)
                      }
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
