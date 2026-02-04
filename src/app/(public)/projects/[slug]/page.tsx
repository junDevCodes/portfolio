type ProjectDetailProps = {
  params: {
    slug: string;
  };
};

export default function ProjectDetailPage({ params }: ProjectDetailProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-black/40">Project</p>
      <h1 className="mt-2 text-3xl font-semibold">{params.slug}</h1>
      <p className="mt-3 max-w-2xl text-sm text-black/60">
        Detail pages will be populated from the public API. This placeholder verifies routing for
        `/projects/[slug]`.
      </p>
    </main>
  );
}
