import { LogIn } from "lucide-react";
import React from "react";
interface HeaderItems {
  title: string;
  description: string;
}
export default function DashbordHeader({ items }: { items: HeaderItems }) {
  return (
    <div>
      <section className="border-b border-border py-4 px-1 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1>{items.title}</h1>
          <p>{items.description}</p>
        </div>
        <button>
          <LogIn />
          <span>خروج</span>
        </button>
      </section>
    </div>
  );
}
