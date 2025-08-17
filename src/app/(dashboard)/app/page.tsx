"use client";
import ActionButtons from "@/app/components/app/ActionButtons";
import CardInfo from "@/app/components/app/CardInfo";
import CardStack from "@/app/components/app/CardStack";
import NoCards from "@/app/components/app/NoCards";
import CARDS from "@/app/data/cards";
import { useEffect, useState } from "react";

interface Card {
  id: number;
  image: string;
  title: string;
  categories: string[];
  price: number;
  reviews: number;
}

export default function AppPage() {
  const [remainingCards, setRemainingCards] = useState<Card[]>(CARDS);
  const [swipedCards, setSwipedCards] = useState<{
    liked: Card[];
    disliked: Card[];
  }>({
    liked: [],
    disliked: [],
  });
  const [wishlistedCards, setWishlistedCards] = useState<Card[]>([]);

  useEffect(
    function () {
      console.log(wishlistedCards.map((card) => card.title));
      localStorage.setItem("wishlist", JSON.stringify(wishlistedCards)); // TEMP, move to backend storage later
    },
    [wishlistedCards]
  );

  const currentCard = remainingCards[0];

  function handleSwipe(card: Card, direction: "left" | "right") {
    setRemainingCards((prev) => prev.filter((c) => c.id !== card.id));
    if (direction == "right") {
      setSwipedCards((prev) => ({ ...prev, liked: [...prev.liked, card] }));
    } else {
      setSwipedCards((prev) => ({
        ...prev,
        disliked: [...prev.disliked, card],
      }));
    }
  }

  function handleLeft() {
    if (currentCard) {
      handleSwipe(currentCard, "left");
    }
  }

  function handleRight() {
    if (currentCard) {
      handleSwipe(currentCard, "right");
    }
  }

  function handleHeart(card: Card) {
    setWishlistedCards((prev) => {
      const isInWishlist = prev.some(
        (wishlistedCard) => wishlistedCard.id === card.id
      );

      if (isInWishlist) {
        return prev;
      }
      const newWishlist = [...prev, card];

      return newWishlist;
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center overflow-x-hidden">
      {remainingCards.length === 0 ? (
        <div>
          <NoCards />
        </div>
      ) : (
        <div className="flex gap-8 justify-center md:bg-white/50 md:shadow-lg md:ring-1 ring-white/15 md:px-20 md:py-10 rounded-3xl md:backdrop-blur-2xl">
          <div className="flex flex-col items-center justify-center p-0 ">
            <CardStack cards={remainingCards} onSwipe={handleSwipe} />
            {currentCard && (
              <ActionButtons
                onSwipeLeft={() => handleLeft()}
                onSwipeRight={() => handleRight()}
                disabled={remainingCards.length == 0}
                onHeart={() => handleHeart(currentCard)}
              />
            )}
          </div>

          <div className="hidden md:block w-100">
            {currentCard && <CardInfo card={currentCard} />}
          </div>
        </div>
      )}
    </div>
  );
}
