"use client";
import { Dashbordlayouts } from "@/data/dashbord";
import DashbordLayout from "./DashbordLayout";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Mail } from "lucide-react";
import Link from "next/link";

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
        <Link
          href={`/`}
          className="group flex w-full items-center gap-4 rounded-lg px-4 py-2 bg-background  hover:bg-secondary-bg "
        >
          <LayoutDashboard className="size-4 shrink-0 group-hover:text-brand text-foreground " />
          <p className="pb-1 group-hover:text-foreground font-semibold text-muted-foreground hover:text-foreground">
            داشبورد
          </p>
        </Link>
      </div>
      {/* dashbord */}
      <div className="my-3 flex flex-col gap-2">
        <p className="text-sm font-normal px-2 text-muted-foreground">
          درخواست ها
        </p>
        <Link
          href={`/contact-messages`}
          className="group flex w-full items-center gap-4 rounded-lg p-4 hover:bg-secondary-bg bg-secondary-bg"
        >
          <Mail className="size-4 shrink-0 group-hover:text-foreground text-brand" />
          <p className="pb-1 group-hover:text-foreground font-semibold text-foreground">
            پیام های دریافتی
          </p>
        </Link>
      </div>
    </div>
  );
}
