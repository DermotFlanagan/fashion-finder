"use client";
import { logout } from "@/lib/actions/auth";
import { Power } from "lucide-react";
import React from "react";

function SignOutButton() {
  return (
    <button
      className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition"
      onClick={() => logout()}
    >
      <Power />
    </button>
  );
}

export default SignOutButton;
