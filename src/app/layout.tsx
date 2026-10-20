import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { iranYekan } from "./fonts";
import DashbordHeader from "@/components/Dashbord/DashbordHeader";
import DashbordSidebar from "@/components/Dashbord/DashbordSidebar";

export const metadata: Metadata = {
  title: "پنل ادمین",
  description: "پنل مدیریت",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={iranYekan.variable}>
      <body className="font-sans antialiased ">
        <main className="w-full flex h-screen overflow-hidden">
          {/* 285px = 71.25 */}
          <div className="shrink-0 w-71.25 ">
            <DashbordSidebar />
          </div>
          <div className="w-full flex flex-col overflow-hidden">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
