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
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">비공개</p>
          <h1 className="text-3xl font-semibold">오너 대시보드</h1>
          <p className="mt-2 text-sm text-white/60">
            {user?.name ?? user?.email ?? "오너"} 계정으로 로그인되어 있습니다.
          </p>
        </div>
        <SignOutButton />
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Foundation 상태</h2>
          <p className="mt-2 text-sm text-white/60">
            Auth.js와 미들웨어가 활성화되었습니다. 다음 단계는 Prisma 스키마 연결과
            오너 계정 시드입니다.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">빠른 링크</h2>
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
