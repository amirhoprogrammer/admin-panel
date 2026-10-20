"use client";
import { Dashbordlayouts } from "@/data/dashbord";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Mail, Sidebar } from "lucide-react";
import Link from "next/link";
import SidebarItemHeader from "./SidebarItemHeader";
import SidebarItem from "./SidebarItem";

export default function DashbordSidebar() {
  const pathname = usePathname();
  if (pathname == "/login") {
    return null;
  }
  return (
    <aside className="border-border-secondary bg-background flex h-screen w-71.25 shrink-0 flex-col border-l pb-4">
      {/* 285px = 71.25 */}
      <div className="border-border shrink-0  px-4">
        {/* 78px = 19.5 */}
        <div className="border-border-secondary flex min-h-19.5 items-center border-b px-2">
          <div className="flex min-w-0 flex-col">
            <h2 className="text-foreground truncate text-[20px] font-semibold">
              آرکات مدیریت
            </h2>
            <p className="text-muted-foreground mt-0 truncate text-[16px]">
              پنل مدیریت
            </p>
          </div>
        </div>
      </div>
      <nav className="flex flex-col gap-y-3 px-4 pt-3 w-full">
        {/* dashbord */}
        <div className="my-3 flex flex-col gap-2">
          <SidebarItemHeader title="نمای کلی" />
          <SidebarItem
            link="/"
            Icon={LayoutDashboard}
            text="داشبورد"
            active={pathname === "/"}
          />
        </div>
        {/* dashbord */}
        <div className="my-3 flex flex-col gap-2">
          <SidebarItemHeader title="درخواست ها" />
          <SidebarItem
            link="/contact-messages"
            Icon={Mail}
            text="پیام های دریافتی"
            active={pathname === "/contact-messages"}
          />
        </div>
      </nav>
    </aside>
  );
}
