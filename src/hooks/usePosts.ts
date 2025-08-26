import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async function (postId: string) {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete post");
      return res.json();
    },
    onSuccess: function () {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useEditPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async function ({
      postId,
      title,
      body,
    }: {
      postId: string;
      title: string;
      body: string;
    }) {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });
      if (!res.ok) throw new Error("Failed to update post");
      return res.json();
    },
    onSuccess: function () {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
