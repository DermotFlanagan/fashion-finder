import SwipeableCard from "./SwipeableCard";

interface Card {
  id: number;
  image: string;
  title: string;
  categories: string[];
  price: number;
  rating?: number;
  reviews: number;
}

interface CardStackProps {
  cards: Card[];
  onSwipe: (card: Card, direction: "left" | "right") => void;
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
