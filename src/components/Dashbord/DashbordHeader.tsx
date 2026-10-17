import { LogIn } from "lucide-react";
import React from "react";
interface HeaderItems {
  id: number;
  title: string;
  description: string;
}
export default function DashbordHeader({ items }: { items: HeaderItems }) {
  return (
    <div className="w-full border-b border-border">
      <section className="py-4 px-8 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-2xl">{items.title}</h1>
          <p className="font-base ">{items.description}</p>
        </div>
        <button className="border border-border bg-brand text-background cursor-pointer rounded-lg flex items-center justify-center gap-2 h-13 p-4">
          <LogIn />
          <span className="mb-2">خروج</span>
        </button>
      </section>
    </div>
  );
}
