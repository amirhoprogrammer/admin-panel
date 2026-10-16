import { Dashbordlayouts } from "@/data/dashbord";
import React from "react";
import DashbordLayout from "./DashbordLayout";

export default function DashbordSidebar() {
  return (
    <div className="w90">
      <div className="border-b border-border p-4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold">آرکان مدیریت</h2>
        <p className="text-base font-normal text-muted-foreground">
          پنل مدیریت
        </p>
      </div>
      <div className="py-2"></div>
      {Dashbordlayouts.map((lay, id) => (
        <DashbordLayout items={lay} key={id} />
      ))}
    </div>
  );
}
