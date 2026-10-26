import AddCategory from "@/components/Category/AddCategory";
import DashbordHeader from "@/components/Dashbord/DashbordHeader";
import { DashbordBodyItems } from "@/data/dashbord";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashbordHeader items={DashbordBodyItems[3]} />
      <div className="mx-5 my-5 rounded-lg border-border border flex-1 min-h-0 overflow-hidden">
        <AddCategory />
      </div>
    </div>
  );
}
