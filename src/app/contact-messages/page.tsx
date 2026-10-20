import DashbordHeader from "@/components/Dashbord/DashbordHeader";
import DashbordSection from "@/components/Dashbord/DashbordSection";
import { DashbordBodyItems } from "@/data/dashbord";
import React from "react";

export default function ContactMassege() {
  return (
    <div className="flex flex-col w-full flex-1 min-h-0">
      <DashbordHeader items={DashbordBodyItems[1]} />
      {/* 500px = 125 ,400px */}
      <div className="flex-1 min-h-0 overflow-hidden  px-6 py-4">
        <DashbordSection />
      </div>
    </div>
  );
}
