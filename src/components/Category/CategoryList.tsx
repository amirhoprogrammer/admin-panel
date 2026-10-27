
"use client";

import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import CategoryCardList from "./CategoryCardList";
import type { Category } from "@/lib/schemas/category";

const rows = ["ترتیب", "دسته بندی", "عملیات"];

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // دریافت دسته‌بندی‌ها
  useEffect(() => {
    const controller = new AbortController();

    async function fetchCategories() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/shop/category", {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("دریافت دسته‌بندی‌ها با خطا مواجه شد");
        }

        const data: Category[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("ساختار اطلاعات دریافتی نامعتبر است");
        }

        setCategories(data);
      } catch (error) {
        if (controller.signal.aborted) return;

        setError(error instanceof Error ? error.message : "خطایی رخ داده است");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchCategories();

    return () => controller.abort();
  }, []);

  // جستجو با تأخیر 300 میلی‌ثانیه
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // حذف دسته‌بندی از state بعد از موفقیت API
  function handleDeleted(id: number) {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  }

  // جستجو و مرتب‌سازی بر اساس index
  const displayedCategories = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLocaleLowerCase();

    return categories
      .filter((category) => category.parent === null)
      .filter((category) =>
        category.name.toLocaleLowerCase().includes(normalizedSearch)
      )
      .sort((a, b) => a.index - b.index);
  }, [categories, debouncedSearch]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-background">
      {/* جستجو و افزودن دسته‌بندی */}
      <div className="flex shrink-0 items-center justify-between gap-3 px-2 py-4">
        <div className="relative w-75 max-w-full">
          <Search className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="جستجوی نام دسته‌بندی..."
            className="h-10.5 w-full rounded-lg border border-border bg-secondary-bg pr-10 pl-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand"
          />
        </div>

        <Link
          href="/categories/add"
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-brand px-5 py-2"
        >
          <Plus className="size-4 text-background" />

          <p className="mb-1.5 font-normal text-background">دسته بندی</p>
        </Link>
      </div>

      {/* عنوان ستون‌ها */}
      <div className="grid shrink-0 grid-cols-[0.5fr_8.5fr_3fr] gap-4 bg-secondary-bg px-6 py-4">
        {rows.map((row) => (
          <p key={row} className="text-sm font-normal text-muted-foreground">
            {row}
          </p>
        ))}
      </div>

      {/* لیست دسته‌بندی‌ها */}
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-2">
        {loading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            در حال دریافت دسته‌بندی‌ها...
          </p>
        ) : error ? (
          <p className="py-8 text-center text-sm text-destructive">{error}</p>
        ) : displayedCategories.length > 0 ? (
          displayedCategories.map((category) => (
            <CategoryCardList
              key={category.id}
              category={category}
              categories={categories}
              onDeleted={handleDeleted}
            />
          ))
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            دسته‌بندی‌ای پیدا نشد.
          </p>
        )}
      </div>
    </div>
  );
}