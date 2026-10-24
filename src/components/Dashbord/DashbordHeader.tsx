import { LogIn, LogOut } from "lucide-react";
import React from "react";
import LogoutButton from "../auth/LogoutButton";
interface HeaderItems {
  slug: string;
  title: string;
  description: string;
}
export default function DashbordHeader({ items }: { items: HeaderItems }) {
  return (
    <div className="flex min-h-0 flex-col">
      <div className="border-b-border-secondary 3xl:px-8 3xl:py-6 flex shrink-0 items-center justify-between border-b px-8 py-6 xl:px-5 xl:py-5 2xl:px-6">
        <div className="min-w-0 pe-6">
          <h1 className="header-title 3xl:text-[26px] mb-2 text-[26px] font-semibold xl:text-[22px] 2xl:text-[24px]">
            {items.title}
          </h1>
          <p className="header-description text-muted-foreground 3xl:text-lg text-lg xl:text-base 2xl:text-[17px]">
            {items.description}
          </p>
        </div>
        <div className="3xl:pe-4 flex shrink-0 items-center gap-x-2 pe-4 xl:gap-x-1.5 xl:pe-0 2xl:gap-x-2">
          {/*<button className="relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg font-medium select-none cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 px-5 text-base bg-primary text-primary-foreground hover:bg-primary-hover group 3xl:h-13 3xl:px-5 3xl:text-[15px] h-12 xl:h-11 xl:px-4 xl:text-sm 2xl:h-12">
            <span className="relative z-10 inline-flex items-center justify-center gap-2">
              <LogOut className="lucide lucide-log-out 3xl:size-5 size-5 transition-transform duration-300 group-hover:-translate-x-0.5 xl:size-4.5 rtl:group-hover:translate-x-0.5" />
              <span className="inline-flex shrink-0 mb-1 font-semibold">
                خروج
              </span>
            </span>
          </button>*/}
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
