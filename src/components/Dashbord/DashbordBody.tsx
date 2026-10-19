import DashbordHeader from "./DashbordHeader";
import { DashbordBodyItems } from "@/data/dashbord";
import DashbordSection from "./DashbordSection";

export default function DashbordBody({ activeSlug }: { activeSlug: string }) {
  const current = DashbordBodyItems.find((item) => item.slug === activeSlug);
  if (!current) return null;

  return (
    <div className="w-full">
      <DashbordHeader items={current} />
      <div className="px-4 py-5">
        {/*<DashbordSection activeSlug={activeSlug} />*/}
      </div>
    </div>
  );
}
