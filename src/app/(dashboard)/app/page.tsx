"use client";
import ActionButtons from "@/app/components/app/ActionButtons";
import CardInfo from "@/app/components/app/CardInfo";
import CardStack from "@/app/components/app/CardStack";
import CreateItemModal from "@/app/components/app/CreateItemModal/CreateItemModal";
import NoCards from "@/app/components/app/NoCards";
import Modal from "@/app/components/ui/Modal";
import Spinner from "@/app/components/ui/Spinner";
import { useCards } from "@/hooks/useCards";
import { useSwipe } from "@/hooks/useSwipe";
import { useSession } from "@/lib/auth-client";
import { Plus, Shirt } from "lucide-react";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface CategoryOnItem {
  itemId: string;
  categoryId: string;
  category: Category;
}

interface Card {
  id: string;
  image: string;
  name: string;
  categories: CategoryOnItem[];
  price: number;
  rating?: number;
  totalReviews: number;
  preferenceScore?: number;
}

export default function AppPage() {
  const { data: session } = useSession();
  const { data: cards, isLoading, error, refetch } = useCards();
  const { swipe, isLoading: isSwipeLoading } = useSwipe();
  const [remainingCards, setRemainingCards] = useState<Card[]>([]);
  const [wishlistedCards, setWishlistedCards] = useState<Card[]>([]);
  const [showCreateItemModal, setShowCreateItemModal] = useState(false);

  useEffect(
    function () {
      localStorage.setItem("wishlist", JSON.stringify(wishlistedCards)); // TEMP, move to backend storage later
    },
    [wishlistedCards]
  );

  useEffect(
    function () {
      if (cards?.cards) {
        setRemainingCards(cards.cards);
      }
    },
    [cards]
  );

  const currentCard = remainingCards[0];

  async function handleSwipe(itemId: string, direction: "RIGHT" | "LEFT") {
    if (!session?.user?.id) {
      console.error("No user session found");
      return;
    }

    try {
      await swipe({
        userId: session.user.id,
        itemId,
        direction,
      });

      setRemainingCards((prev) => prev.filter((card) => card.id !== itemId));
    } catch (error) {
      console.error("Error recording swipe:", error);
    }
  }

  function handleLeft() {
    if (currentCard) {
      handleSwipe(currentCard.id, "LEFT");
    }
  }

  function handleRight() {
    if (currentCard) {
      handleSwipe(currentCard.id, "RIGHT");
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

  if (isLoading) return <Spinner />;
  if (error) return <div>ERROR</div>;

  return (
    <div className="">
      {remainingCards.length === 0 && !isLoading ? (
        <div>
          <NoCards />
        </div>
      ) : (
        <div className="">
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

          <div
            className="absolute bottom-10 right-10 rounded-full bg-purple-400 p-3 shadow-lg cursor-pointer text-white hover:bg-purple-700 transition"
            onClick={() => setShowCreateItemModal(true)}
          >
            <Shirt />
          </div>
        </div>
      )}

      <CreateItemModal
        isOpen={showCreateItemModal}
        onClose={() => setShowCreateItemModal(false)}
      />
    </div>
  );
}
