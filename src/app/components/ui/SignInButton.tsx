"use client";
import { login } from "@/lib/actions/auth";
import { Github } from "lucide-react";
import React from "react";

function SignInButton() {
  return (
    <button
      className="border border-white  px-6 py-2 rounded-full backdrop-blur cursor-pointer hover:bg-white hover:text-black transition flex gap-2"
      onClick={() => login()}
    >
      <Github />
      Log in
    </button>
  );
}

export default SignInButton;
