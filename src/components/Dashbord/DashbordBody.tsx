import React from "react";
import DashbordHeader from "./DashbordHeader";
import { DashbordBodyItems } from "@/data/dashbord";

export default function DashbordBody() {
  return (
    <div className="w-full">
      <DashbordHeader items={DashbordBodyItems[0]} />
    </div>
  );
}
