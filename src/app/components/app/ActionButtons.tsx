import { Check, Flag, Heart, Undo2, X } from "lucide-react";
import React from "react";

interface ActionButtonsProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  disabled?: boolean;
  onHeart: () => void;
}

function ActionButtons({
  onSwipeLeft,
  onSwipeRight,
  disabled = false,
  onHeart,
}: ActionButtonsProps) {
  return (
    <div className="flex w-full justify-between px-10 mt-5 bg-neutral-100 rounded-full shadow-lg">
      <button className="group cursor-pointer">
        <Undo2 className="group-hover:-rotate-40 transition-all" />
      </button>
      <button
        className="group cursor-pointer"
        onClick={onSwipeLeft}
        disabled={disabled}
      >
        <X
          color="#9b0000"
          strokeWidth={3}
          className="group-hover:scale-130 transition"
        />
      </button>
      <button
        className="rounded-full bg-white p-3 text-red-500 shadow-lg -my-1 cursor-pointer group transition-all hover:shadow-black/20 hover:-translate-y-0.5"
        onClick={onHeart}
      >
        <Heart
          fill="#ff2626"
          color="#e60000"
          size={28}
          className="group-hover:animate-throb  transition group-hover:scale-105"
        />
      </button>

      <button
        className="group cursor-pointer"
        onClick={onSwipeRight}
        disabled={disabled}
      >
        <Check
          color="#009e08"
          strokeWidth={3}
          className="group-hover:scale-130 transition"
        />
      </button>
      <button className="group cursor-pointer">
        <Flag className="group-hover:animate-wave transition-all" />
      </button>
    </div>
  );
}

export default ActionButtons;
