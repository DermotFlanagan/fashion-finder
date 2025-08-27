import React, { useRef } from "react";
import CategoryCard from "./CategoryCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const categories = [
  {
    name: "bag",
    type: "colour",
    image:
      "https://images.unsplash.com/photo-1527385352018-3c26dd6c3916?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "shoes",
    type: "item",
    image:
      "https://plus.unsplash.com/premium_photo-1682435561654-20d84cef00eb?q=80&w=1018&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "glasses",
    type: "item",
    image:
      "https://images.unsplash.com/photo-1570993492880-e8b3bfd5e100?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "trousers",
    type: "item",
    image:
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "hoodie",
    type: "item",
    image:
      "https://plus.unsplash.com/premium_photo-1673125510222-1a51e3a8ccb0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvb2RpZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "grey",
    type: "colour",
    image:
      "https://plus.unsplash.com/premium_photo-1674747086635-8eaa94b847f7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "white",
    type: "colour",
    image:
      "https://images.unsplash.com/photo-1706192048397-71ce1148d24f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "green",
    type: "colour",
    image:
      "https://images.unsplash.com/photo-1706192048400-884d17841d62?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "sunglasses",
    type: "item",
    image:
      "https://images.unsplash.com/photo-1608539733292-190446b22b83?q=80&w=952&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "dress",
    type: "item",
    image:
      "https://plus.unsplash.com/premium_photo-1673481601147-ee95199d3896?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "shorts",
    type: "item",
    image:
      "https://images.unsplash.com/photo-1740512922260-543b1b83c986?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "yellow",
    type: "colour",
    image:
      "https://images.unsplash.com/photo-1642779978153-f5ed67cdecb2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "modern",
    type: "style",
    image:
      "https://plus.unsplash.com/premium_photo-1755958633200-2825567854b2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "scarf",
    type: "item",
    image:
      "https://images.unsplash.com/photo-1457545195570-67f207084966?q=80&w=1192&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "cotton",
    type: "material",
    image:
      "https://plus.unsplash.com/premium_photo-1675788292709-6182097ee2a4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "jacket",
    type: "item",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "denim",
    type: "material",
    image:
      "https://images.unsplash.com/photo-1541840031508-326b77c9a17e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "t-shirt",
    type: "item",
    image:
      "https://plus.unsplash.com/premium_photo-1673356301535-2cc45bcc79e4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "black",
    type: "colour",
    image:
      "https://plus.unsplash.com/premium_photo-1672682781710-e814d70c26f4?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "red",
    type: "colour",
    image:
      "https://images.unsplash.com/photo-1614061650474-e3e715e45001?q=80&w=1220&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "linen",
    type: "material",
    image:
      "https://plus.unsplash.com/premium_photo-1701157946903-57c2821d71b7?q=80&w=929&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "blue",
    type: "colour",
    image:
      "https://images.unsplash.com/photo-1666112514330-1059df5ac254?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "jumper",
    type: "item",
    image:
      "https://plus.unsplash.com/premium_photo-1670930887547-518452a967fb?q=80&w=716&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "shirt",
    type: "item",
    image:
      "https://images.unsplash.com/photo-1603251579431-8041402bdeda?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "brown",
    type: "colour",
    image:
      "https://plus.unsplash.com/premium_photo-1674747086992-4c22192f24d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJvd24lMjBmYWJyaWN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "recycled",
    type: "sustainable",
    image:
      "https://images.unsplash.com/photo-1647152777991-4298db91a1f6?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "handmade",
    type: "sustainable",
    image:
      "https://plus.unsplash.com/premium_photo-1674273913264-09d7198571cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGFuZG1hZGUlMjBjbG90aGVzfGVufDB8fDB8fHww",
  },
  {
    name: "silk",
    type: "material",
    image:
      "https://images.unsplash.com/photo-1619043518800-7f14be467dca?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "formal",
    type: "style",
    image:
      "https://images.unsplash.com/photo-1724245190409-97f3415a7d78?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "orange",
    type: "colour",
    image:
      "https://plus.unsplash.com/premium_photo-1674617774416-97a6a17ef397?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "casual",
    type: "style",
    image:
      "https://plus.unsplash.com/premium_photo-1693242804269-90f818c6001f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGNhc3VhbCUyMGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "jeans",
    type: "item",
    image:
      "https://plus.unsplash.com/premium_photo-1674828601362-afb73c907ebe?q=80&w=753&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "leather",
    type: "material",
    image:
      "https://images.unsplash.com/photo-1571829604981-ea159f94e5ad?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "vintage",
    type: "style",
    image:
      "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "wool",
    type: "material",
    image:
      "https://images.unsplash.com/photo-1602706294170-1fed8eecd9f9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function CategoryCarousel({
  handleSelect,
  selectedLiked,
}: {
  handleSelect: (name: string) => void;
  selectedLiked: string[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(function () {
    if (!containerRef.current) return;

    gsap.from(containerRef.current.children, {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, []);
  return (
    <div className="w-full overflow-x-auto max-w-[80vw]">
      <div
        ref={containerRef}
        className="flex gap-6 px-4 py-6 snap-x snap-mandatory overflow-x-scroll"
      >
        {categories.map((c) => (
          <div key={c.name} className="snap-center flex-shrink-0">
            <CategoryCard
              {...c}
              isSelected={selectedLiked.includes(c.name)}
              onClick={() => handleSelect(c.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryCarousel;
