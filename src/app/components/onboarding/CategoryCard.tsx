import Image from "next/image";
import React from "react";

function CategoryCard({
  name,
  type,
  image,
  isSelected,
  onClick,
  occupied,
}: {
  name: string;
  type: string;
  isSelected: boolean;
  image: string;
  onClick: () => void;
  occupied: boolean;
}) {
  return (
    <div
      className={`h-96 w-72 rounded-t-2xl flex flex-col overflow-hidden relative cursor-pointer transition duration-300 shadow-black/40 ${
        isSelected
          ? "-translate-y-2 shadow-lg"
          : "hover:-translate-y-2 shadow-md "
      }
      ${occupied && "pointer-events-none"}`}
      onClick={onClick}
    >
      <Image
        width={720}
        height={960}
        src={image}
        alt={name}
        className={`h-full w-full transition rounded-t-2xl object-cover  ${
          isSelected && "scale-110"
        } ${occupied && "grayscale opacity-40"}`}
      />

      <div
        className={`absolute inset-0 bg-gradient-to-t transition ${
          isSelected
            ? "from-purple-900 to-transparent"
            : "from-black/80 to-transparent"
        } 
        `}
      />

      <div className="absolute flex gap-2 text-white flex-col items-start bottom-5 left-5">
        <h1 className="text-4xl capitalize">{name}</h1>
        <h2 className="text-2xl italic">{type}</h2>
      </div>
    </div>
  );
}

export default CategoryCard;
