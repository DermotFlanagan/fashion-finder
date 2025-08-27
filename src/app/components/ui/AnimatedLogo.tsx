"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const images = [
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1695603438043-1b9ab6ebe1a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2NhcmZ8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1722489292294-426912777649?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1673356301340-4522591be5f7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1620509501621-2d6ef1dbfde4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8WWVsbG93JTIwY290dG9uJTIwZHJlc3N8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1622560482379-c9813322e95a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEJyb3duJTIwbGVhdGhlciUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1726930176449-388f0bced974?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8T3JhbmdlJTIwanVtcGVyfGVufDB8fDB8fHww",
];

export default function AnimatedLogo({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const containerRef = useRef(null);
  const mainSquareRef = useRef(null);
  const clonesRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    gsap.set(clonesRef.current, { scale: 0, opacity: 0 });
    gsap.set(mainSquareRef.current, { opacity: 0, scale: 1 });

    tl.to(
      mainSquareRef.current,
      { scale: 6, opacity: 0, duration: 0.7, ease: "power3.in" },
      "+=0.2"
    )
      .to(
        clonesRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
        },
        0
      )
      .to(
        containerRef.current,
        {
          rotate: 360,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "+=0.5"
      )
      .to(mainSquareRef.current, { opacity: 1, duration: 0.4 }, ">-0.8")
      .to(
        clonesRef.current,
        {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          stagger: 0.05,
        },
        "<"
      )
      .to(
        mainSquareRef.current,
        { scale: 24, opacity: 0, duration: 0.5, ease: "power3.in" },
        "+=0.2"
      );

    tl.eventCallback("onComplete", onComplete);
  }, [onComplete]);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="relative w-[300px] h-[300px]">
        <div
          ref={mainSquareRef}
          className="absolute top-1/2 left-1/2 w-[100px] h-[100px] -translate-x-1/2 -translate-y-1/2 opacity-0"
          style={{
            backgroundImage: 'url("/logo-plain.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 2,
          }}
        />

        {images.map((src, i) => {
          const positions = [
            [-110, -110],
            [0, -110],
            [110, -110],
            [-110, 0],
            [110, 0],
            [-110, 110],
            [0, 110],
            [110, 110],
          ];
          if (i >= positions.length) return null;
          const [x, y] = positions[i];
          return (
            <div
              key={i}
              ref={(el) => (clonesRef.current[i] = el)}
              className="absolute top-1/2 left-1/2 w-[100px] h-[100px] -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(${x}px, ${y}px) scale(0)`,
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
