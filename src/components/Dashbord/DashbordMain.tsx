"use client";
import { useState } from "react";
import DashbordBody from "./DashbordBody";
import DashbordSidebar from "./DashbordSidebar";

export default function DashbordMain() {
  const [activeId, setActiveId] = useState(0);
  return (
    <section className="flex flex-col w-full h-screen lg:flex-row">
      <div className="w-full lg:w-[20%] h-full">
        <DashbordSidebar activeId={activeId} onSelect={setActiveId} />
      </div>
      <div className="w-full lg:w-[80%]">
        <DashbordBody activeId={activeId} />
      </div>
    </section>
  );
}
