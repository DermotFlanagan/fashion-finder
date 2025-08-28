import SwipeableCard from "./SwipeableCard";

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
  images: string[];
  name: string;
  categories: CategoryOnItem[];
  price: number;
  rating?: number;
  totalReviews: number;
  preferenceScore?: number;
}

interface CardStackProps {
  cards: Card[];
  onSwipe: (itemId: string, direction: "RIGHT" | "LEFT") => void;
}

function CardStack({ cards, onSwipe }: CardStackProps) {
  if (cards.length == 0) {
    return "";
  }

  return (
    <div className="grid place-items-center">
      {cards.map((card, index) => {
        return (
          <SwipeableCard
            key={card.id}
            card={card}
            index={index}
            onSwipe={onSwipe}
          />
        );
      })}
    </div>
  );
}

export default CardStack;
