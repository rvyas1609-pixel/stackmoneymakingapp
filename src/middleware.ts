import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/pricing",
    "/api/crypto/webhook",
    "/api/clerk/webhook",
    "/auth/sign-in",
    "/auth/sign-up",
  ],
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
    '/__clerk/(.*)',
  ],
};
