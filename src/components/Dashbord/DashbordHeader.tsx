import { LogIn } from "lucide-react";
import React from "react";
interface HeaderItems {
  title: string;
  description: string;
}
export default function DashbordHeader({ items }: { items: HeaderItems }) {
  return (
    <div className="w-[85%]">
      <section className="border-b border-border py-4 px-1 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1>{items.title}</h1>
          <p>{items.description}</p>
        </div>
        <button className="border border-border bg-brand text-background cursor-pointer rounded-lg flex items-center justify-center gap-2 h-13 mt-10">
          <LogIn />
          <span className="mb-2">خروج</span>
        </button>
      </section>
    </div>
  );
}
