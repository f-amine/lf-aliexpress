import NextAuth from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "./authOptions";
interface RouteHandlerContext {
  params: { nextauth: string[] }
}
async function handler(req: NextRequest, context: RouteHandlerContext) {
  return await NextAuth(req, context, authOptions)
}export { handler as GET, handler as POST };
