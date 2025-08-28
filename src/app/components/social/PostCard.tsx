import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ellipsis, Heart, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import Modal from "../ui/Modal";
import { useSession } from "@/lib/auth-client";
import PostDropdown from "../ui/UserDropdown/PostDropdown";
import { useDeletePost, useEditPost } from "@/hooks/usePosts";
import { useClickOutside } from "@/hooks/useClickOutside";
import { redirect } from "next/navigation";

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

function PostCard({ post, currUser }: { post: Post; currUser: User }) {
  const [showLikers, setShowLikers] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const isLiked = post.likes.some((like) => like.userId === currUser.id);
  const likeCount = post.likes.length;
  const commentCount = post.comments.length;
  const { data: session } = useSession();
  const [formData, setFormData] = useState({ content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setShowOptions(false));

  const queryClient = useQueryClient();

  const deletePost = useDeletePost();
  const editPost = useEditPost();

  function handleDeletePost() {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost.mutate(post.id);
    }
  }

  function handleEditPost() {}

  const likeMutation = useMutation({
    mutationFn: async function () {
      const url = `/api/posts/${post.id}/like`;
      const method = isLiked ? "DELETE" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to update like");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  async function handleLikePost() {
    if (post.user.id == currUser.id) return;
    if (likeMutation.isPending) return;
    likeMutation.mutate();
  }

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.content.trim()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/posts/${post.id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to add comment");

      setFormData({ content: "" });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    } catch (err) {
      console.error("Error while creating comment: ", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl flex p-3 flex-col shadow-sm">
      <div className="flex">
        <div
          className="w-12 h-12 flex-shrink-0 cursor-pointer"
          onClick={() => redirect(`account/${post.userId}`)}
        >
          <Image
            src={post.user.image || ""}
            alt={post.user.name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col ml-2 min-w-0 w-full">
          <div className="flex flex-col">
            <div className="flex justify-between relative">
              <h3
                className="font-semibold text-gray-400 cursor-pointer text-sm"
                onClick={() => redirect(`account/${post.userId}`)}
              >
                {post.user.name}
              </h3>
              {post.userId == currUser.id && (
                <Ellipsis
                  className="text-gray-400 hover:text-black transition cursor-pointer"
                  onClick={() => setShowOptions((prev) => !prev)}
                />
              )}
              {showOptions && (
                <div
                  ref={dropdownRef}
                  className="absolute items-end justify-end top-6 right-0 animate-dropdown"
                >
                  <PostDropdown
                    onDelete={handleDeletePost}
                    onEdit={handleEditPost}
                  />
                </div>
              )}
            </div>

            <h2 className="font-bold text-xl break-words">{post.title}</h2>
          </div>
          <p className="text-gray-700 break-words ">{post.body}</p>
        </div>
      </div>

      <div className="flex gap-4 items-end justify-end mt-2">
        <div className="flex justify-center items-center gap-2">
          <Heart
            className={`transition cursor-pointer ${
              isLiked ? "text-red-500 fill-red-500" : "hover:text-red-500"
            } ${likeMutation.isPending && "opacity-50"}`}
            onClick={handleLikePost}
          />
          <p
            onClick={() => {
              setShowLikers(true);
            }}
            role="button"
            className="cursor-pointer"
          >
            {likeCount}
          </p>
        </div>
        <div
          className="flex justify-center items-center gap-2 cursor-pointer group"
          onClick={() => setShowComments(true)}
          role="button"
        >
          <MessageSquare className="group-hover:text-purple-400 transition " />
          <p role="button">{commentCount}</p>
        </div>
      </div>

      <Modal
        isOpen={showLikers}
        onClose={() => setShowLikers(false)}
        title="Liked by"
      >
        <div className="flex flex-col gap-3 overflow-y-auto max-h-50">
          {post.likes.map((like) => (
            <div key={like.id} className="flex items-center gap-3">
              <Image
                src={like.user.image || ""}
                alt={like.user.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <p>{like.user.name}</p>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        title="Comments"
      >
        <div className="bg-white rounded-2xl p-3 shadow-sm">
          <form onSubmit={handleCommentSubmit} className="flex gap-3">
            <div className="w-12 h-12 flex-shrink-0">
              <Image
                src={session?.user?.image || ""}
                alt={session?.user?.name || ""}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            </div>

            <div className="flex flex-col flex-1 gap-2">
              <h3 className="font-semibold text-gray-400 text-sm">
                {session?.user?.name}
              </h3>
              <textarea
                placeholder="Write a comment..."
                className="text-gray-700 outline-none bg-gray-100 w-full rounded-md p-2 resize-none min-h-[60px]"
                maxLength={128}
                rows={2}
                required
                value={formData.content}
                onChange={(e) => setFormData({ content: e.target.value })}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="self-end bg-purple-400 text-white px-4 py-1 rounded-md text-sm hover:bg-purple-500 transition font-semibold cursor-pointer"
              >
                {isSubmitting ? "Please wait..." : "Comment"}
              </button>
            </div>
          </form>
        </div>
        {post.comments.map((comment) => (
          <div
            key={comment.id}
            className="flex bg-white rounded-2xl p-3 shadow-sm mt-3"
          >
            <div className="w-12 h-12 flex-shrink-0">
              <Image
                src={comment.user.image || ""}
                alt={comment.user.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col ml-2 min-w-0 w-full">
              <div className="flex flex-col">
                <div className="flex justify-between relative">
                  <h3 className="font-semibold text-gray-400 cursor-pointer text-sm">
                    {comment.user.name}
                  </h3>
                  {post.userId == currUser.id && (
                    <Ellipsis className="text-gray-400 hover:text-black transition cursor-pointer" />
                  )}
                </div>
              </div>
              <p className="text-gray-700 break-words ">{comment.content}</p>
            </div>
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default PostCard;
