import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {
    return;
  },
  {
    callbacks: {
      authorized: ({ token }) => (token as { isOwner?: boolean } | null)?.isOwner === true,
    },
    pages: {
      signIn: "/auth/signin",
    },
  },
);

export const config = {
  matcher: ["/app/:path*", "/api/app/:path*"],
};
