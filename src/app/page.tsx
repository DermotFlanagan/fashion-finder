"use client";
import Image from "next/image";
import SignInButton from "./components/ui/SignInButton";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function HomePage() {
  const { data: session } = useSession();

  if (session) {
    redirect("/app");
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden max-h-screen">
      <video
        className="absolute top-0 left-0 h-full w-full object-cover -z-10 max-h-screen pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
      >
        <source src="/bg-video-shadow.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="flex flex-col items-center justify-center h-full  text-white ">
        <Image
          src="/logo-bg-circular-plain.png"
          width={150}
          height={150}
          alt="Fashion Finder logo"
          className="mb-12"
        />
        <h1 className="text-4xl md:text-6xl font-bold mb-4 cursor-default">
          FashionFinder
        </h1>

        <p className="text-xl cursor-default">
          Swipe sustainably, shop smarter.
        </p>

        <hr className="mt-4 w-24 border-t border-white" />

        <div className="mt-8 flex gap-8 relative z-50 flex-col md:flex-row">
          <SignInButton provider="github" />
          <SignInButton provider="google" />
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 text-center text-sm">
          <p className="cursor-default">FashionFinder &#169; 2025</p>
        </div>
      </div>
    </div>
  );
}
