import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/auth";

type GuardResult =
  | { session: Session; response?: never }
  | { session?: never; response: NextResponse };

export async function getAuthSession(): Promise<Session | null> {
  return getServerSession(authOptions);
}

export function unauthorizedResponse(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function forbiddenResponse(message = "Forbidden") {
  return NextResponse.json({ error: message }, { status: 403 });
}

export async function requireAuth(): Promise<GuardResult> {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    return { response: unauthorizedResponse() };
  }

  return { session };
}

export async function requireOwner(): Promise<GuardResult> {
  const result = await requireAuth();

  if ("response" in result) {
    return result;
  }

  if (!result.session.user.isOwner) {
    return { response: forbiddenResponse() };
  }

  return result;
}
