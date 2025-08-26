"use client";
import { signIn } from "@/lib/auth-client";
import { Github } from "lucide-react";
import React from "react";
import { FaGoogle } from "react-icons/fa";

function SignInButton({ provider }: { provider: string }) {
  function handleLogIn(provider: string) {
    if (provider === "google") {
      signIn.social({ provider: "google", callbackURL: "/app" });
    } else if (provider === "github") {
      signIn.social({ provider: "github", callbackURL: "/app" });
    }
  }

  return (
    <button
      className="border border-white  px-6 py-2 rounded-full backdrop-blur cursor-pointer hover:bg-white hover:text-black transition flex gap-2"
      onClick={() => handleLogIn(provider)}
    >
      {provider == "github" && <Github size={24} />}
      {provider == "google" && <FaGoogle size={24} />}
      Log in
    </button>
  );
}

export default SignInButton;
