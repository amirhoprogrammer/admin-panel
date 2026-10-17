import { Dashbordlayouts } from "@/data/dashbord";
import DashbordLayout from "./DashbordLayout";

interface SidebarProps {
  activeId: number;
  onSelect: (id: number) => void;
}

export default function DashbordSidebar({ activeId, onSelect }: SidebarProps) {
  return (
    <div className="w90 h-full w-full border-border border-l">
      <div className="border-b border-border p-4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold">آرکان مدیریت</h2>
        <p className="text-base font-normal text-muted-foreground">
          پنل مدیریت
        </p>
      </div>
      <div className="py-2"></div>
      {Dashbordlayouts.map((lay, id) => (
        <DashbordLayout
          items={lay}
          key={id}
          isActive={lay.id === activeId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
