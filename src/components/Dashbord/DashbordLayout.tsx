"use client";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
interface layoutItems {
  id: number;
  layoutTitle: string;
  layoutIcon: LucideIcon;
  layoutText: string;
}
interface Props {
  items: layoutItems;
  isActive: boolean;
  onSelect: (id: number) => void;
}

export default function DashbordLayout({ items, isActive, onSelect }: Props) {
  const Icon = items.layoutIcon;
  return (
    <div className="my-3 flex flex-col gap-2">
      <p className="text-sm font-normal px-2 text-muted-foreground">
        {items.layoutTitle}
      </p>
      <button
        className="group flex items-center gap-4 rounded-lg bg-background p-4 hover:bg-secondary-bg cursor-pointer"
        onClick={() => onSelect(items.id)}
      >
        <Icon className="size-4 shrink-0 text-muted-foreground group-hover:text-brand" />
        <p className="font-normal text-muted-foreground group-hover:font-semibold group-hover:text-foreground pb-1">
          {items.layoutText}
        </p>
      </button>
    </div>
  );
}
