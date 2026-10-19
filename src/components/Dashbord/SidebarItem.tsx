import { LucideIcon } from 'lucide-react'
import Link from 'next/link';
import React from 'react'
interface Props{
    link: string,
    Icon: LucideIcon,
    text: string,
}
export default function SidebarItem(items: Props) {
    const Icon = items.Icon
  return (
    <Link
      href={items.link}
      className="group flex w-full items-center gap-4 rounded-lg px-4 py-2 bg-background  hover:bg-secondary-bg "
    >
      <Icon className="size-4 shrink-0 group-hover:text-brand text-foreground " />
      <p className="pb-1 group-hover:text-foreground font-semibold text-muted-foreground hover:text-foreground">
        {items.text}
      </p>
    </Link>
  );
}
