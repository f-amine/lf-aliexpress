"use client";

import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import LoadingSpinner from "../ui/loading-spinner";
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Suspense
        fallback={
          <LoadingSpinner className="flex justify-center items-center min-h-screen" />
        }
      >
        {children}
      </Suspense>
    </SessionProvider>
  );
}
