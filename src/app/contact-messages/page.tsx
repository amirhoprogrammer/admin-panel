import DashbordHeader from "@/components/Dashbord/DashbordHeader";
import DashbordSection from "@/components/Dashbord/DashbordSection";
import { DashbordBodyItems } from "@/data/dashbord";
import React from "react";

export default function ContactMassege() {
  return (
    <div className="flex flex-col w-full">
      <DashbordHeader items={DashbordBodyItems[1]} />
      <div className="px-4 py-5">
        {/*<DashbordSection />*/}
      </div>
    </div>
  );
}
