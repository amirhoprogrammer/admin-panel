import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { iranYekan } from "./fonts";

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
      <body className="font-sans antialiased ">{children}</body>
    </html>
  );
}
