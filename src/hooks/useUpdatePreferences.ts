import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdatePreferencesPayload {
  userId: string;
  likedCategories: string[];
  dislikedCategories: string[];
}

export function useUpdatePreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdatePreferencesPayload) => {
      const res = await fetch("/api/userPreferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to update preferences");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPreferences"] });
    },
  });
}
