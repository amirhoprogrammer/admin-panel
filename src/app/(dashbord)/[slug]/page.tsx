import { Suspense } from "react";
import { notFound } from "next/navigation";
import DashbordMain from "@/components/Dashbord/DashbordMain";
import { Dashbordlayouts } from "@/data/dashbord";

export function generateStaticParams() {
  return Dashbordlayouts.map((item) => ({ slug: item.slug }));
}

async function Content({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!Dashbordlayouts.some((item) => item.slug === slug)) notFound();
  return <DashbordMain activeSlug={slug} />;
}

export default function DashbordPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <Content params={params} />
    </Suspense>
  );
}
