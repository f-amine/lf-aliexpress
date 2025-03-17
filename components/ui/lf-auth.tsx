"use client";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./loading-spinner";

export default function LfAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      signIn("lightfunnels");
    } else {
      router.push("/connection");
    }
  }, [session, status, router]);

  if (status !== "authenticated") {
    return (
      <LoadingSpinner className="flex justify-center items-center min-h-screen" />
    );
  }

  return null;
}
