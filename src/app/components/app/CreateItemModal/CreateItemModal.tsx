import React, { useState } from "react";
import Modal from "../../ui/Modal";
import ImageSelector from "./ImageSelector";
import Image from "next/image";
import CategorySelect from "./CategorySelect";

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
      title="Upload item"
      isOpen={isOpen}
      onClose={() => {
        setFormData({ title: "", price: 0, categories: [], images: [] });
        onClose();
      }}
    >
      <form className="flex gap-2 flex-col">
        <div className="flex gap-2">
          <ImageSelector onChange={handleImageChange} />
          <div className="grid grid-rows-2 grid-cols-2">
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
            onChange={(selectedValues) =>
              setFormData((prev) => ({ ...prev, categories: selectedValues }))
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
            max={1000}
          />
        </div>
      </form>
    </Modal>
  );
}

export default CreateItemModal;
