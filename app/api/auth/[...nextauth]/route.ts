import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

// For App Router, NextAuth is called differently
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
