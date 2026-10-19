"use client";
import { Dashbordlayouts } from "@/data/dashbord";
import DashbordLayout from "./DashbordLayout";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Mail, Sidebar } from "lucide-react";
import Link from "next/link";
import SidebarItemHeader from "./SidebarItemHeader";
import SidebarItem from "./SidebarItem";

//interface SidebarProps {
//  activeId: number;
//  onSelect: (id: number) => void;
//}

export default function DashbordSidebar() {
  const pathname = usePathname();
  if (pathname == "/login") {
    return null;
  }
  return (
    <div className="w90 h-full w-full border-border border-l">
      <div className="border-b border-border p-4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold">آرکان مدیریت</h2>
        <p className="text-base font-normal text-muted-foreground">
          پنل مدیریت
        </p>
      </div>
      <div className="py-2"></div>
      {/*{Dashbordlayouts.map((lay, id) => (
        <DashbordLayout
          items={lay}
          isActive={lay.slug === pathname}
          key={id}
        />
      ))}*/}
      {/* dashbord */}
      <div className="my-3 flex flex-col gap-2">
        <p className="text-sm font-normal px-2 text-muted-foreground">
          نمای کلی
        </p>
        <SidebarItem link="/" Icon={LayoutDashboard} text="داشبورد" />
      </div>
      {/* dashbord */}
      <div className="my-3 flex flex-col gap-2">
        <p className="text-sm font-normal px-2 text-muted-foreground">
          درخواست ها
        </p>
        <SidebarItem
          link="/contact-messages"
          Icon={Mail}
          text="پیام های دریافتی"
        />
      </div>
    </div>
  );
}
