import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Spinner from "../ui/Spinner";
import Image from "next/image";
import { Crown, Heart, Medal, Trophy } from "lucide-react";

function TrendingItems() {
  const queryClient = useQueryClient();

  const {
    data: trendingItems = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trending-items"],
    queryFn: async function () {
      const response = await fetch("/api/wishlist/popular?limit=10");
      if (!response.ok) {
        throw new Error("Failed to fetch trending items");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>🤔 Error loading trending items.</div>;

  return (
    <div className="hidden flex-[0.6] max-h-[80vh] min-h-[80vh] p-4 bg-white/50 rounded-2xl ring-2 ring-black/5 md:flex flex-col gap-2 items-center justify-between cursor-default">
      <div className="flex gap-4">
        <Heart />
        <h1 className="font-bold">Top Wishlisted</h1>
      </div>

      <div className="overflow-y-scroll flex flex-col gap-4">
        {trendingItems.map((item, index) => (
          <div key={item.id} className="max-h-full relative ">
            {index === 0 && (
              <div className="absolute top-2 left-2 z-10 bg-yellow-500 rounded-full py-1 flex items-center justify-center gap-2 text-white px-2">
                <Crown size={16} className="text-white" />
                <p>{item._count.wishlist}</p>
              </div>
            )}
            {index === 1 && (
              <div className="absolute top-2 left-2 z-10 bg-gray-400 rounded-full py-1 flex items-center justify-center gap-2 text-white px-2">
                <Medal size={16} className="text-white" />
                <p>{item._count.wishlist}</p>
              </div>
            )}
            {index === 2 && (
              <div className="absolute top-2 left-2 z-10 bg-amber-600 rounded-full py-1 flex items-center justify-center gap-2 text-white px-2">
                <Trophy size={16} className="text-white" />
                <p>{item._count.wishlist}</p>
              </div>
            )}
            {index > 2 && (
              <div className="absolute top-2 left-2 z-10 bg-white rounded-full py-1 flex items-center justify-center opacity-70 px-3">
                <p>{item._count.wishlist}</p>
              </div>
            )}

            <Image
              src={item.images[0]?.url}
              alt="Item image"
              width={500}
              height={500}
              className="w-48 h-48 object-cover rounded-xl shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingItems;
