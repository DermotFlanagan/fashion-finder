import React, { useEffect, useRef, useState } from "react";
import CategoryCarousel from "./Carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

function DislikesForm({
  setCurrStep,
}: {
  setCurrStep: (step: number) => void;
}) {
  const [selectedDisliked, setSelectedDisliked] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(function () {
    if (!h1Ref.current || !h2Ref) return;

    const split = new SplitText(h1Ref.current, { type: "words" });

    gsap.from(split.words, {
      opacity: 0,
      y: -20,
      duration: 0.6,
      stagger: 0.1,
      ease: "power1.inOut",
    });

    gsap.from(h2Ref.current, {
      opacity: 0,
      delay: 1,
      x: -20,
      ease: "power3",
    });
  });

  useEffect(function () {
    const saved = localStorage.getItem("dislikedCategories");
    if (saved) {
      setSelectedDisliked(JSON.parse(saved));
    }
  }, []);

  function handleSubmit() {
    if (selectedDisliked.length < 3) {
      setError("Please select at least 3 categories.");
      return;
    }
    localStorage.setItem(
      "dislikedCategories",
      JSON.stringify(selectedDisliked)
    );
    setError("");
    setCurrStep(2);
  }

  function handlePrev() {
    setCurrStep(0);
  }

  function handleSelect(name: string) {
    if (selectedDisliked.includes(name)) {
      const newList = selectedDisliked.filter((category) => category != name);
      setSelectedDisliked(newList);
    } else {
      setSelectedDisliked((prev) => [...prev, name]);
    }
  }
  return (
    <div className="max-h-screen flex items-center justify-center flex-col md:p-20 text-center p-10">
      <div className="flex gap-4 flex-col mb-12">
        <h1 ref={h1Ref} className="text-purple-400 text-5xl font-bold">
          ...And what don&apos;t you like?
        </h1>
        <h2 ref={h2Ref} className="text-lg">
          Select the categories you aren&apos;t too keen on.
        </h2>
      </div>

      <CategoryCarousel
        handleSelect={handleSelect}
        selectedLiked={selectedDisliked}
      />

      <div className="flex items-end justify-between w-full max-w-[80vw]">
        <button
          onClick={handlePrev}
          className="gap-2 rounded-xl bg-gray-300 flex items-center justify-center text-white px-8 py-2 font-semibold text-xl hover:bg-gray-500 cursor-pointer transition"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={handleSubmit}
          className="gap-2 rounded-xl bg-purple-400 flex items-center justify-center text-white px-8 py-2 font-semibold text-xl hover:bg-purple-700 cursor-pointer transition"
        >
          <ArrowRight />
        </button>
      </div>

      <div className="font-semibold text-red-400 mt-4">{error}</div>
    </div>
  );
}

export default DislikesForm;
