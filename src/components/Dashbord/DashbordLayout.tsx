import type { LucideIcon } from "lucide-react";
interface layoutItems {
  layoutTitle: string;
  layoutIcon: LucideIcon;
  layoutText: string;
}

export default function DashbordLayout({ items }: { items: layoutItems }) {
  const Icon = items.layoutIcon
  return (
    <div>
      <p className="text-sm font-light px-2">{items.layoutTitle}</p>
      <div className="bg-background hover:bg-secondary-bg hover:rounded-lg p-4">
        <Icon className="size-4 bg-primary hover:bg-brand"/>
        <p className="font-normal hover:font-semibold">{items.layoutText}</p>
      </div>
    </div>
  );
}
