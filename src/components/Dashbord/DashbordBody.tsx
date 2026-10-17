import React from "react";
import DashbordHeader from "./DashbordHeader";
import { DashbordBodyItems } from "@/data/dashbord";

export default function DashbordBody({ activeId }: { activeId: number }) {
  const current = DashbordBodyItems.find((item) => item.id === activeId);

  if (!current) return null;
  return (
    <div className="w-full">
      <DashbordHeader items={current} />
    </div>
  );
}
