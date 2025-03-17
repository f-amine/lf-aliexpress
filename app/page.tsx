'use client'
import React from "react";
import { signOut } from "next-auth/react";
import LoadingSpinner from "@/components/ui/loading-spinner";
export default function Home() {
  React.useEffect(() => {
    const handleSignOut = async () => {
      let data = await signOut({ callbackUrl: "/connection" });
      if (!data) {
        window.location.href = "/connection";
      }
    };
    handleSignOut();
  }, []);
  return (
    <LoadingSpinner className="flex justify-center items-center min-h-screen" />
  )
}
