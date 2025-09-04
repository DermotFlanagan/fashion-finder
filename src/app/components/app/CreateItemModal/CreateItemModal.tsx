import React, { useState } from "react";
import Modal from "../../ui/Modal";
import ImageSelector from "./ImageSelector";
import Image from "next/image";
import CategorySelect from "./CategorySelect";
import { useQueryClient, useMutation } from "@tanstack/react-query";

function CreateItemModal({
  isOpen = false,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  type FormData = {
    title: string;
    price: number;
    categories: string[];
    images: File[];
  };

  const [formData, setFormData] = useState<FormData>({
    title: "",
    price: 0,
    categories: [],
    images: [],
  });

  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createItemMutation = useMutation({
    mutationFn: async (data: {
      title: string;
      price: number;
      categories: string[];
      images: string[];
    }) => {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create item");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      setFormData({ title: "", price: 0, categories: [], images: [] });
      onClose();
    },
    onError: (err) => {
      console.error("Error creating item:", err);
    },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      formData.images.length < 1 ||
      formData.categories.length < 1 ||
      formData.price < 0.01
    )
      return;

    setIsSubmitting(true);

    try {
      const uploadedUrls = await Promise.all(
        formData.images.map(async (file) => {
          const formDataToSend = new FormData();
          formDataToSend.append("file", file);

          const res = await fetch("/api/upload", {
            method: "POST",
            body: formDataToSend,
          });
          const data = await res.json();
          return data.url;
        })
      );

      const bodyToSend = {
        title: formData.title,
        price: formData.price,
        categories: formData.categories,
        images: uploadedUrls,
      };

      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyToSend),
      });

      if (!response.ok) throw new Error("Failed to create new item");

      setFormData({ title: "", price: 0, categories: [], images: [] });
      onClose();
    } catch (err) {
      console.error("Error while creating item: ", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleImageChange(files: FileList | null) {
    if (!files) return;
    const selectedFiles = Array.from(files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...selectedFiles],
    }));
  }

  return (
    <Modal
      title="Upload Item"
      isOpen={isOpen}
      onClose={() => {
        setFormData({ title: "", price: 0, categories: [], images: [] });
        onClose();
      }}
    >
      <form className="flex gap-2 flex-col" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <ImageSelector onChange={handleImageChange} />
          <div className="grid grid-rows-2 grid-cols-2 gap-2">
            {formData.images.map((img, idx) => {
              const objectUrl = URL.createObjectURL(img);
              return (
                <div className="relative w-20 h-20" key={idx}>
                  <Image
                    src={objectUrl}
                    alt="item image"
                    className="object-cover rounded-md"
                    fill
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-col flex">
          <label className="font-semibold">Item Name</label>
          <input
            type="text"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            className="outline-none rounded-md bg-gray-200 px-3 py-2"
          />
        </div>

        <div className="flex-col flex">
          <label className="font-semibold">Item Categories</label>
          <CategorySelect
            onChange={(selected) =>
              setFormData((prev) => ({
                ...prev,
                categories: selected.map((s) => s.value),
              }))
            }
          />
        </div>

        <div className="flex-col flex">
          <label className="font-semibold">Item Price</label>
          <input
            type="number"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }))
            }
            className="outline-none rounded-md bg-gray-200 px-3 py-2"
            min={0.01}
            max={2000}
            step="any"
          />
        </div>

        <button
          type="submit"
          disabled={createItemMutation.isPending}
          className="mt-4 cursor-pointer bg-purple-400 rounded-md text-white px-4 py-1 font-semibold hover:bg-purple-500 transition"
        >
          {createItemMutation.isPending ? "Please wait..." : "Post"}
        </button>
      </form>
    </Modal>
  );
}

export default CreateItemModal;
