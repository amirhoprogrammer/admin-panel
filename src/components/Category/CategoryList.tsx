"use client";

import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const rows = ["ترتیب", "دسته بندی", "عملیات"];
export default function CategoryList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // جستجو با تاخیر 300 میلی‌ثانیه
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-background">
      <div className="flex shrink-0 items-center justify-between gap-3 px-2 py-4">
        {/* جستجو */}
        <div className="relative w-75 max-w-full">
          <Search className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="جستجوی نام، شماره، ایمیل و پیام..."
            className="h-10.5 w-full rounded-lg border border-border bg-secondary-bg pr-10 pl-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand"
          />
        </div>

        {/* مرتب‌سازی */}
        <Link
          href="/add"
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-brand px-5 py-2"
        >
          <Plus className="size-4 text-background" />
          <p className="font-normal mb-1.5 text-background">دسته بندی</p>
        </Link>
      </div>

      {/* عنوان ستون‌ها */}
      <div className="grid shrink-0 grid-cols-3 gap-4 bg-secondary-bg px-6 py-4">
        {rows.map((row, id) => (
          <p className="text-sm font-normal text-muted-foreground" key={id}>
            {row}
          </p>
        ))}
      </div>
    </div>
  );
}
