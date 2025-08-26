"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function signIn() {
  const result = await auth.api.signInSocial({
    body: {
      provider: "github",
      callbackURL: "/app",
    },
  });

  if (result.url) {
    redirect(result.url);
  }
}
