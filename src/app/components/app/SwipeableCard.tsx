"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";

interface Card {
  id: number;
  image: string;
  title: string;
  categories: string[];
  price: number;
  rating?: number;
  reviews: number;
}

interface SwipeableCardProps {
  card: Card;
  index: number;
  onSwipe: (card: Card, direction: "left" | "right") => void;
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

  function handleDragEnd() {
    const dragDistance = x.get();
    const threshold = 120;

    if (Math.abs(dragDistance) > threshold) {
      const direction = dragDistance > 0 ? "right" : "left";
      onSwipe(card, direction);
    }
  }

  return (
    <motion.img
      src={card.image}
      alt="image"
      style={{
        gridRow: 1,
        gridColumn: 1,
        opacity: isTopCard ? opacity : 1,
        x: isTopCard ? x : 0,
        rotate: isTopCard ? rotate : 0,
        zIndex: 10 - index,
        scale,
      }}
      className="rounded-2xl shadow-lg h-96 w-72 object-cover hover:cursor-grab active:cursor-grabbing "
      drag={isTopCard ? "x" : false}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={isTopCard ? handleDragEnd : undefined}
      animate={{ scale }}
    />
  );
}
