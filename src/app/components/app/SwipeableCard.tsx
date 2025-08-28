"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRightCircle } from "lucide-react";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface CategoryOnItem {
  itemId: string;
  categoryId: string;
  category: Category;
}

interface Image {
  url: string;
}

interface Card {
  id: string;
  images: Image[];
  name: string;
  categories: CategoryOnItem[];
  price: number;
  rating?: number;
  totalReviews: number;
  preferenceScore?: number;
}

interface SwipeableCardProps {
  card: Card;
  index: number;
  onSwipe: (itemId: string, direction: "RIGHT" | "LEFT") => void;
}

export default function SwipeableCard({
  card,
  index,
  onSwipe,
}: SwipeableCardProps) {
  const x = useMotionValue(0);

  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const isTopCard = index === 0;
  const scale = 1 - index * 0.05;
  const colourOverlay = useTransform(
    x,
    [-200, 0, 200],
    ["rgba(255, 0,0,0.4)", "rgba(0,0,0,0)", "rgba(0,255,0,0.4)"]
  );

  const rightIconOpacity = useTransform(x, [0, 100, 200], [0, 1, 1]);
  const leftIconOpacity = useTransform(x, [-200, -100, 0], [1, 1, 0]);
  const iconScale = useTransform(x, [-200, 0, 200], [2, 0.7, 2]);
  const [imgIdx, setImgIdx] = useState(0);

  function handleDragEnd() {
    const dragDistance = x.get();
    const threshold = 120;

    if (Math.abs(dragDistance) > threshold) {
      const direction = dragDistance > 0 ? "RIGHT" : "LEFT";
      onSwipe(card.id, direction);
    }
  }

  return (
    <motion.div
      style={{
        gridRow: 1,
        gridColumn: 1,
        zIndex: 10 - index,
        scale,
        rotate: isTopCard ? rotate : 0,
        x: isTopCard ? x : 0,
        opacity: isTopCard ? opacity : 1,
      }}
      className="group relative rounded-2xl shadow-lg h-96 w-72 hover:cursor-grab active:cursor-grabbing"
      drag={isTopCard ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={isTopCard ? handleDragEnd : undefined}
      animate={{ scale }}
    >
      <motion.img
        src={card.images?.[imgIdx]?.url ?? undefined}
        alt={card.name}
        className="rounded-2xl shadow-lg h-full w-full object-cover cursor-pointer pointer-events-auto"
        draggable={false}
      />

      <div
        className="absolute bottom-2 right-2 z-50 bg-purple-700 rounded-full p-2 text-white cursor-pointer opacity-40 hover:opacity-70 transition"
        onClick={(e) => {
          e.stopPropagation();
          if (!card.images || card.images.length === 0) return;
          setImgIdx((prev) => (prev + 1) % card.images.length);
        }}
      >
        <ArrowRightCircle />
      </div>

      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ backgroundColor: colourOverlay }}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center text-4xl"
        style={{ opacity: leftIconOpacity, scale: iconScale }}
      >
        🤮
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center text-4xl"
        style={{ opacity: rightIconOpacity, scale: iconScale }}
      >
        💖
      </motion.div>
    </motion.div>
  );
}
