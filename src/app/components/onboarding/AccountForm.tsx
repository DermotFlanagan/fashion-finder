import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, Pen } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useUpdatePreferences } from "@/hooks/useUpdatePreferences";

function AccountForm({ setCurrStep }: { setCurrStep: (step: number) => void }) {
  const { data: session } = useSession();
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [dislikedItems, setDislikedItems] = useState<string[]>([]);

  useEffect(function () {
    const disliked = localStorage.getItem("dislikedCategories");
    const liked = localStorage.getItem("likedCategories");

    if (disliked) setDislikedItems(JSON.parse(disliked));
    if (liked) setLikedItems(JSON.parse(liked));
  }, []);

  function handlePrev() {
    setCurrStep(1);
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(function () {
    if (!containerRef.current || !h1Ref.current || !h2Ref.current) return;

    gsap.from(containerRef.current.children, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.from(h1Ref.current, {
      opacity: 0,
      x: -20,
      duration: 0.6,
      ease: "power1.inOut",
    });

    gsap.from(h2Ref.current, {
      opacity: 0,
      x: 20,
      delay: 0.4,
      duration: 0.6,
      ease: "power1.inOut",
    });
  });

  const upadatePreferences = useUpdatePreferences();

  async function handleSubmit() {
    if (!session?.user?.id) {
      return;
    }
    try {
      await upadatePreferences.mutateAsync({
        userId: session.user.id,
        likedCategories: likedItems,
        dislikedCategories: dislikedItems,
      });
      window.location.href = "/app";
    } catch (err) {
      console.error("Failed to update preferences: ", err);
    }
  }

  if (!session) {
    return;
  }

  return (
    <div className="max-h-screen flex items-center justify-center flex-col md:p-20 text-center p-10">
      <div className="flex gap-4 flex-col mb-12">
        <h1 ref={h1Ref} className="text-purple-400 text-5xl font-bold">
          Check yourself out!
        </h1>
        <h2 ref={h2Ref} className="text-lg">
          One last check before you can start swiping...
        </h2>
      </div>

      <div ref={containerRef} className="max-w-[80vw] mb-12">
        <div className="bg-white/50 shadow-lg ring-1 ring-white/15 px-8 py-10 rounded-3xl backrop-blur-2xl">
          <div className="flex items-center gap-6 flex-col md:flex-row">
            <div className="relative">
              <div className="absolute z-100 bg-purple-400 rounded-full opacity-0 hover:opacity-70 w-full h-full flex items-center transition text-white justify-center cursor-pointer scale-90">
                <Pen />
              </div>
              <Image
                src={session.user?.image || ""}
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full border-4 border-white shadow-lg"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 text-start">
                {session.user?.name || "User"}
              </h1>
              <p className="text-gray-600">{session.user?.email}</p>
              <div className="flex gap-4">
                <p>
                  <span className="font-bold">0</span> following
                </p>
                <p>
                  <span className="font-bold">0</span> followers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          <Check />
        </button>
      </div>
    </div>
  );
}

export default AccountForm;
