import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { SignOutButton } from "@/components/auth/SignOutButton";

export default async function AppHome() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-12">
      <header className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Private</p>
          <h1 className="text-3xl font-semibold">Owner Dashboard</h1>
          <p className="mt-2 text-sm text-white/60">
            You are signed in as {user?.name ?? user?.email ?? "Owner"}.
          </p>
        </div>
        <SignOutButton />
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Foundation Status</h2>
          <p className="mt-2 text-sm text-white/60">
            Auth.js and middleware are online. Next step: plug in Prisma schema and seed the
            owner account.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>/app/portfolio</li>
            <li>/app/projects</li>
            <li>/app/resumes</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
