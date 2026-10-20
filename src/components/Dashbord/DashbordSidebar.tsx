"use client";
import { Dashbordlayouts } from "@/data/dashbord";
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
    <div className="w-full border-border border-l h-screen px-4">
      <div className="border-b border-border p-4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold">آرکات مدیریت</h2>
        <p className="text-base font-normal text-muted-foreground">
          پنل مدیریت
        </p>
      </div>
      <div className="py-2"></div>
      {/* dashbord */}
      <div className="my-3 flex flex-col gap-2">
        <p className="text-sm font-normal px-2 text-muted-foreground">
          نمای کلی
        </p>
        <SidebarItem
          link="/"
          Icon={LayoutDashboard}
          text="داشبورد"
          active={pathname === "/"}
        />
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
          active = {pathname === "/contact-messages"}
        />
      </div>
    </div>
  );
}
