import { useSession } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

export function useCards() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  return useQuery({
    queryKey: ["cards", userId],
    queryFn: async function () {
      const response = await fetch("/api/cards", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch cards");
      return response.json();
    },
    enabled: !!session?.user?.id,
  });
}
