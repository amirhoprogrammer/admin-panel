import type { LucideIcon } from "lucide-react";
import Link from "next/link";
interface layoutItems {
  slug: string;
  layoutTitle: string;
  layoutIcon: LucideIcon;
  layoutText: string;
}
interface Props {
  items: layoutItems;
  isActive: boolean;
}
export default function DashbordLayout({ items, isActive }: Props) {
  const Icon = items.layoutIcon;
  return (
    <div className="my-3 flex flex-col gap-2">
      <p className="text-sm font-normal px-2 text-muted-foreground">
        {items.layoutTitle}
      </p>
      <Link
        href={`/${items.slug}`}
        className={`group flex w-full items-center gap-4 rounded-lg p-4 hover:bg-secondary-bg ${
          isActive ? "bg-secondary-bg" : "bg-background"
        }`}
      >
        <Icon
          className={`size-4 shrink-0 group-hover:text-foreground ${
            isActive ? "text-brand" : "text-muted-foreground"
          }`}
        />
        <p
          className={`pb-1 group-hover:text-foreground ${
            isActive
              ? "font-semibold text-foreground"
              : "font-normal text-muted-foreground"
          }`}
        >
          {items.layoutText}
        </p>
      </Link>
    </div>
  );
}
