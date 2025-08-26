import Image from "next/image";
import SignInButton from "./components/ui/SignInButton";

export default function HomePage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden max-h-screen">
      <video
        className="absolute t0p-0 left-0 h-full w-full object-cover -z-10"
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

        <div className="mt-8 flex gap-8">
          {/* <button className="bg-white text-black px-6 py-2 rounded-full cursor-pointer hover:bg-gray-300 transition">
            Sign in
          </button> */}
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
