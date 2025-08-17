// Server actions related to auth
"use server";

import { signIn, signOut } from "@/auth";

export async function login() {
  await signIn("github", { redirectTo: "/app" });
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
