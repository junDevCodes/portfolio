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
          Public portfolio, private command center.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-black/60">
          A unified workspace for curated public work and the private workflows that power it.
          This foundation focuses on architecture, authentication, and a clean boundary between
          public and owner-only features.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/90"
            href="/projects"
          >
            View projects
          </a>
          <a
            className="rounded-full border border-black/20 px-5 py-3 text-sm font-semibold text-black transition hover:border-black/40"
            href="/auth/signin"
          >
            Owner sign in
          </a>
        </div>

        <section className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Public",
              body: "Fast ISR-backed pages for portfolio and project details.",
            },
            {
              title: "Private",
              body: "Owner-only dashboard secured by Auth.js + middleware.",
            },
            {
              title: "Data",
              body: "PostgreSQL + Prisma with pooled connections for serverless stability.",
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
