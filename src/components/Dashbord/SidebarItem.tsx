"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
interface Props {
  link: string;
  Icon: LucideIcon;
  text: string;
  active?: boolean;
}
export default function SidebarItem({ link, Icon, text, active }: Props) {
  const [click, setClick] = useState(0);
  return (
    <Link
      onClick={() => setClick(1)}
      href={link}
      className={cn(
        "group flex w-full items-center gap-4 rounded-lg px-4 py-2 hover:bg-secondary-bg",
        active ? "bg-secondary-bg" : "bg-background"
      )}
    >
      <Icon
        className={cn(
          "size-4 shrink-0 group-hover:text-foreground text-muted-foreground ",
          active ? "text-brand" : "text-muted-foreground "
        )}
      />
      <p
        className={cn(
          "pb-1 group-hover:text-foreground font-semibold text-muted-foreground hover:text-foreground",
          active ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {text}
      </p>
    </Link>
  );
}
