"use client";
import Image from "next/image";
import Link from "next/link";
import { User, Heart, Settings, BookHeart } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";

export default function AccountPage() {
  const { data: session } = useSession();
  if (!session) {
    return <div>Loading...</div>;
  }
  const handleSignOut = () => {
    if (!session) return;
    signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  const accountTabs = [
    {
      title: "Profile",
      description: "Edit your personal information",
      href: "/account/profile",
      icon: User,
    },
    {
      title: "Wishlist",
      description: "View your wishlisted items",
      href: "/account/liked",
      icon: Heart,
    },
    {
      title: "Preferences",
      description: "View and reset preferences",
      href: "/account/preferences",
      icon: BookHeart,
    },
    {
      title: "Settings",
      description: "Privacy and account settings",
      href: "/account/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto flex items-center justify-center">
      <div className="bg-white/50 shadow-lg ring-1 ring-white/15 px-8 py-10 rounded-3xl backdrop-blur-2xl">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative hidden md:block">
            <Image
              src={session.user?.image || ""}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
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

        <div className="grid md:grid-cols-2 gap-6">
          {accountTabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="group p-6 bg-white/70 rounded-2xl border border-gray-200 hover:border-gray-300 hover:bg-white/90 transition hover:shadow-md"
              >
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-purple-500 rounded-xl text-white group-hover:bg-purple-300 group-hover:scale-105">
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {tab.title}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm">
                      {tab.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div
          className="bg-white flex items-center justify-center mt-12 rounded-xl border border-gray-200 hover:border-gray-300 transition hover:shadow-md cursor-pointer py-2"
          onClick={handleSignOut}
        >
          Log Out
        </div>
      </div>
    </div>
  );
}
