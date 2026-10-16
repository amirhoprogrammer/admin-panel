import DashbordMain from "@/components/Dashbord/DashbordMain";
import DashbordSidebar from "@/components/Dashbord/DashbordSidebar";
import React from "react";

export default function Dashbord() {
  return (
    <main className="flex">
      <section className="w-[18%] border-border border-l">
        <DashbordMain />
      </section>
    </main>
  );
}
