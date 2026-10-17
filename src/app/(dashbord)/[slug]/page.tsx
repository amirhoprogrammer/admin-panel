import { notFound } from "next/navigation";
import DashbordMain from "@/components/Dashbord/DashbordMain";
import { Dashbordlayouts } from "@/data/dashbord";

export function generateStaticParams() {
  return Dashbordlayouts.map((item) => ({ slug: item.slug }));
}

export default async function DashbordPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const exists = Dashbordlayouts.some((item) => item.slug === slug);
  if (!exists) notFound();

  return <DashbordMain activeSlug={slug} />;
}
