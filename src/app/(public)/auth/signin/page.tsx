"use client";

import { Suspense } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const ERROR_MESSAGES: Record<string, string> = {
  unauthorized: "You must sign in to access the owner dashboard.",
  owner: "This account is not authorized as the owner.",
  AccessDenied: "Access denied. Please use the owner account.",
};

function SignInContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") ?? "";
  const message = ERROR_MESSAGES[error];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b10] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-12 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-amber-400/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-indigo-500/10 blur-[160px]" />
      </div>

      <main className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Image src="/globe.svg" alt="Dev OS" width={24} height={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Dev OS</p>
              <h1 className="text-2xl font-semibold">Owner Sign In</h1>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-white/70">
            Access to the private dashboard is restricted. Sign in with the owner account
            configured in Auth.js and the database.
          </p>

          {message ? (
            <div className="mt-5 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
              {message}
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => signIn("github", { callbackUrl: "/app" })}
            className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Sign in with GitHub
          </button>

          <div className="mt-6 border-t border-white/10 pt-4 text-xs text-white/50">
            Need access? Ask the team lead to grant owner permission or set the OWNER_EMAIL
            allowlist.
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b0b10]" />}>
      <SignInContent />
    </Suspense>
  );
}
