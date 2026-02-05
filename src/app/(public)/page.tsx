export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6f5f2] text-[#1a1a1a]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-amber-300/40 blur-[120px]" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-cyan-300/40 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-rose-200/40 blur-[140px]" />
      </div>

      <main className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-black/50">Dev OS</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
          공개 포트폴리오와 비공개 커맨드 센터.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-black/60">
          공개 작업은 간결하게 보여주고, 오너 전용 워크플로는 안전하게 운영하는 통합
          공간입니다. 이 기반은 아키텍처, 인증, 그리고 공개/비공개 경계를 명확히
          구분하는 데 집중합니다.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/90"
            href="/projects"
          >
            프로젝트 보기
          </a>
          <a
            className="rounded-full border border-black/20 px-5 py-3 text-sm font-semibold text-black transition hover:border-black/40"
            href="/auth/signin"
          >
            오너 로그인
          </a>
        </div>

        <section className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "공개",
              body: "포트폴리오와 프로젝트 상세를 빠르게 제공하는 ISR 페이지.",
            },
            {
              title: "비공개",
              body: "Auth.js와 미들웨어로 보호되는 오너 전용 대시보드.",
            },
            {
              title: "데이터",
              body: "서버리스 환경을 고려한 PostgreSQL + Prisma 풀링 연결.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur"
            >
              <h2 className="text-lg font-semibold">{card.title}</h2>
              <p className="mt-2 text-sm text-black/60">{card.body}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
