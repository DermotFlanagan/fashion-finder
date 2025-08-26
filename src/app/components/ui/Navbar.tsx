"use client";
import { Compass, Home, Menu, Spotlight, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import UserDropdown from "./UserDropdown/UserDropdown";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

function Navbar({ fixed = false }: { fixed: boolean }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();

  const pathname = usePathname();

  const isHomeActive = pathname === "/app";
  const isUsersActive = pathname === "/social";
  const isSpotlightActive = pathname === "/spotlight";
  const isCompassActive = pathname === "/locate";

  function handleShowDropdown() {
    setShowDropdown((prev) => !prev);
  }
  return (
    <div
      className={` ${
        fixed ? "fixed" : ""
      } top-0 left-0 z-50 w-full flex items-center justify-between px-12 py-5 bg-white/5 border-b border-white rounded-b-3xl shadow backdrop-blur-2xl`}
    >
      <Link
        href={"/app"}
        className="flex gap-2 items-center justify-center cursor-pointer"
      >
        <Image
          src={"/logo-plain.png"}
          width={500}
          height={500}
          alt="fashion finder logo"
          className="w-10 h-10"
        />
      </Link>
      <Menu className="md:hidden  cursor-pointer" />

      <div className="items-center gap-12 px-6 py-3 font-semibold hidden md:flex border border-t-0 rounded-xl border-neutral-200 shadow-white md:ring-black/5 md:backdrop-blur-2xl md:bg-white/5 md:shadow-xs md:ring-1">
        <Link
          className={` cursor-pointer transition flex items-center gap-2 ${
            isHomeActive
              ? "scale-120 text-black font-black"
              : "hover:scale-110 text-gray-600"
          }`}
          href={"/app"}
        >
          <Home />
        </Link>
        <Link
          href={"/social"}
          className={` cursor-pointer transition flex items-center gap-2 ${
            isUsersActive
              ? "scale-120 text-black font-black"
              : "hover:scale-110 text-gray-600"
          }`}
        >
          <Users />
        </Link>
        <Link
          href={"/spotlight"}
          className={` cursor-pointer transition flex items-center gap-2 ${
            isSpotlightActive
              ? "scale-120 text-black font-black"
              : "hover:scale-110 text-gray-600"
          }`}
        >
          <Spotlight />
        </Link>
        <Link
          href={"/locate"}
          className={` cursor-pointer transition flex items-center gap-2 ${
            isCompassActive
              ? "scale-120 text-black font-black"
              : "hover:scale-110 text-gray-600"
          }`}
        >
          <Compass />
        </Link>
      </div>
      <div className="hidden md:flex relative">
        <button>
          {session ? (
            <>
              <Image
                src={session.user?.image}
                height={128}
                width={128}
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-purple-400 cursor-pointer"
                onClick={handleShowDropdown}
              />
              {showDropdown && (
                <div className="absolute top-full right-0 mt-2 z-50 animate-dropdown">
                  <UserDropdown />
                </div>
              )}
            </>
          ) : (
            <div className="w-10 h-10 rounded-full bg-neutral-300 border-2 border-white" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
