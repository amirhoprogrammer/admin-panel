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
        " group relative mb-1 flex h-12 items-center gap-2.5 rounded-lg px-3.5 text-[15px] font-medium duration-300 hover:border-border hover:bg-secondary-bg/60",
        active ? "bg-secondary-bg border border-border" : "bg-background"
      )}
    >
      <Icon
        className={cn(
          "size-4 shrink-0 group-hover:text-foreground text-muted-foreground ",
          active ? "text-brand group-hover:text-brand" : "text-muted-foreground "
        )}
      />
      <p
        className={cn(
          "min-w-0 truncate pb-1 group-hover:text-foreground font-semibold text-muted-foreground hover:text-foreground",
          active ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {text}
      </p>
    </Link>
  );
}
