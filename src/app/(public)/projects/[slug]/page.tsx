type ProjectDetailProps = {
  params: {
    slug: string;
  };
};

export default function ProjectDetailPage({ params }: ProjectDetailProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-black/40">프로젝트</p>
      <h1 className="mt-2 text-3xl font-semibold">{params.slug}</h1>
      <p className="mt-3 max-w-2xl text-sm text-black/60">
        상세 페이지는 공개 API 데이터를 기반으로 렌더링될 예정입니다. 현재는
        `/projects/[slug]` 라우팅을 확인하는 플레이스홀더입니다.
      </p>
    </main>
  );
}
