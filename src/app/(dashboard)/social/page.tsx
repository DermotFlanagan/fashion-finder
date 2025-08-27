"use client";

import PostCard from "@/app/components/social/PostCard";
import Modal from "@/app/components/ui/Modal";
import Spinner from "@/app/components/ui/Spinner";
import { useSession } from "@/lib/auth-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Flame, Hourglass, PenSquare } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  image: string | null;
}

interface Like {
  id: string;
  userId: string;
  user: User;
}

interface Comment {
  id: string;
  userId: string;
  content: string;
  user: User;
}

interface Post {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
  likes: Like[];
  comments: Comment[];
}

export default function SocialPage() {
  const queryClient = useQueryClient();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { data: session } = useSession();
  const [sortBy, setSortBy] = useState<"new" | "hot">("new");
  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ["posts", sortBy],
    queryFn: async function () {
      const response = await fetch(`/api/posts?sortBy=${sortBy}`);
      if (!response.ok) throw new Error("Failed to fetch posts");
      return response.json();
    },
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    staleTime: 15000,
  });
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!session) {
    return <Spinner />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title.trim() || !formData.body.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create new post");

      setFormData({ title: "", body: "" });
      setShowCreateForm(false);

      queryClient.invalidateQueries({ queryKey: ["posts"] });
    } catch (err) {
      console.error("Error while creating post: ", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  const currUser = session?.user;

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
      <div
        className="absolute bottom-10 right-10 rounded-full bg-purple-400 p-3 shadow-lg cursor-pointer text-white hover:bg-purple-700 transition"
        onClick={() => setShowCreateForm(true)}
      >
        <PenSquare />
      </div>

      <div className="flex-[0.8]">
        <div className="bg-white">
          <h1>
            This space is going to be used to display the most wishlisted items
          </h1>
        </div>
      </div>

      <div className="flex-[1.4] bg-white/50 rounded-2xl ring-2 ring-black/5 flex flex-col overflow-y-auto max-h-[80vh] min-h-[80vh] md:max-w-[33vw] max-w-[85vw] md:min-w-[33vw] min-w-[85vw]">
        <div className="flex py-3 gap-4 items-center justify-center sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-gray-200 ">
          <button
            onClick={() => setSortBy("new")}
            className={`hover:text-purple-500 transition cursor-pointer flex gap-2 justify-center items-center font-semibold ${
              sortBy === "new" && "text-purple-500"
            }`}
          >
            <Hourglass size={20} />
            New
          </button>
          <h1 className="text-gray-500 cursor-default">|</h1>
          <button
            onClick={() => setSortBy("hot")}
            className={`hover:text-purple-500 transition cursor-pointer flex gap-2 justify-center items-center font-semibold ${
              sortBy === "hot" && "text-purple-500"
            }`}
          >
            <Flame size={20} />
            Hot
          </button>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex gap-4 p-2 md:p-6 flex-col">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.id} post={post} currUser={currUser} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center bg-white px-4 py-4 rounded-xl">
                <h1 className="text-4xl mb-4">🧐</h1>
                <h1 className="text-xl font-bold">It's a bit quiet...</h1>
                <p className="text-lg text-neutral-400">
                  Be the first to post!
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex-[0.8]">
        <div className="bg-white">
          <h1>This space will display notifications</h1>
        </div>
      </div>

      <Modal
        title="New post"
        onClose={() => {
          setShowCreateForm(false);
          setFormData({ title: "", body: "" });
        }}
        isOpen={showCreateForm}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 overflow-y-auto max-h-70 bg-white rounded-2xl p-3 shadow-sm"
        >
          <div className="flex">
            <div className="w-12 h-12 flex-shrink-0">
              <Image
                src={session.user.image || ""}
                alt={session.user.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            </div>

            <div className="flex flex-col ml-2 w-full">
              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-400 cursor-default text-sm">
                  {session.user.name}
                </h3>
                <input
                  type="text"
                  placeholder="Enter a title"
                  maxLength={24}
                  required
                  className="outline-none font-bold text-xl"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>
              <textarea
                className="text-gray-700 outline-none bg-gray-200 w-full rounded-md p-2 resize-none"
                required
                maxLength={128}
                value={formData.body}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, body: e.target.value }))
                }
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="self-end justify-end cursor-pointer bg-purple-400 rounded-md text-white px-4 py-1 font-semibold hover:bg-purple-500 transition"
          >
            {isSubmitting ? "Please wait..." : "Post"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
