import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Card {
  id: number;
  image: string;
  title: string;
  categories: string[];
  price: number;
  rating?: number;
  reviews: number;
}

interface CardInfoProps {
  card: Card;
}

function CardInfo({ card }: CardInfoProps) {
  function renderStars(rating: number = 0) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} color="#FBD60B" fill="#FBD60B" size={20} />);
      } else if (i == fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star color="#FBD60B" size={20} />
            <Star
              color="#FBD60B"
              fill="#FBD60B"
              size={20}
              className="absolute top-0 left-0 overflow-hidden"
              style={{ clipPath: "inset(0 50% 0 0)" }}
            />
          </div>
        );
      } else {
        stars.push(<Star key={i} color="#FBD60B" size={20} />);
      }
    }
    return stars;
  }

  function getRatingColour(rating: number) {
    if (rating < 50) return "text-red-700";
    if (rating < 75) return "text-orange-400";
    return "text-green-600";
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-4 mt-5 cursor-default">
        <h1 className="font-bold text-3xl ">{card.title}</h1>

        <div className="flex flex-wrap gap-2">
          {card.categories.slice(0, 4).map((category, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg text-sm font-semibold "
            >
              {category}
            </span>
          ))}
          {card.categories.length > 4 && (
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg text-sm font-semibold ">
              +{card.categories.length - 4}
            </span>
          )}
        </div>

        <div className="">
          <h2>
            Brand / User Name{" "}
            <span className={`font-bold ${getRatingColour(76)}`}>(76%)</span>
          </h2>
        </div>

        <div className="">
          <span className="text-2xl font-bold">£{card.price.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-around mb-20">
        <div className="flex items-center">
          <div className="flex">{renderStars(card.rating)}</div>
          <span className=" ml-4 cursor-default">
            {card.rating
              ? `${card.rating.toFixed(1)} (${card.reviews} reviews)`
              : "No rating"}
          </span>
        </div>

        <div className="flex items-center">
          <div className="rounded-full overflow-hidden hover:-translate-y-1 transition cursor-pointer">
            <Image src={"/faces/face1.jpg"} alt="User" width={40} height={40} />
          </div>
          <div className="rounded-full overflow-hidden -translate-x-4 hover:-translate-y-1 transition cursor-pointer">
            <Image src={"/faces/face2.jpg"} alt="User" width={40} height={40} />
          </div>
          <div className="rounded-full overflow-hidden -translate-x-8 hover:-translate-y-1 transition cursor-pointer">
            <Image src={"/faces/face3.jpg"} alt="User" width={40} height={40} />
          </div>
          <span className=" cursor-default -ml-4 font-semibold">
            3 friends like this
          </span>
        </div>
      </div>
    </div>
  );
}

export default CardInfo;
