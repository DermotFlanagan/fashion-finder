import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SwipeData {
  userId: string;
  itemId: string;
  direction: "RIGHT" | "LEFT";
}

export function useSwipe() {
  const queryClient = useQueryClient();

  const swipeMutation = useMutation({
    mutationFn: async ({ userId, itemId, direction }: SwipeData) => {
      const response = await fetch("/api/swipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          itemId,
          direction,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to record swipe");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });

      queryClient.invalidateQueries({ queryKey: ["userPreferences"] });
    },
    onError: (error) => {
      console.error("Error recording swipe:", error);
    },
  });

  return {
    swipe: swipeMutation.mutate,
    isLoading: swipeMutation.isPending,
    error: swipeMutation.error,
  };
}

/* 
Handle mutation for recording swipe
Update BOTH swipe record and user preferences
If swipe is successful, invalidate relevant queries to trigger refetches

Requires: ItemID of item being swiped, direction of swipe, userID of swiper
On Success: Record swipe in DB, update user preferences based on item categories, 
RIGHT: +1 to each category, LEFT: -1 to each category
*/
