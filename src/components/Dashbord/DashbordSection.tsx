"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowDownUp, Search } from "lucide-react";
import DashbordCard from "./DashbordCard";
import type { Contact } from "@/lib/schemas/contact";

const rows = [
  "شناسه",
  "نام و نام خانوادگی",
  "شماره همراه",
  "ایمیل",
  "متن پیام",
  "تاریخ ثبت",
  "عملیات",
];

export default function DashbordSection() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isNewestFirst, setIsNewestFirst] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // دریافت اطلاعات از API
  useEffect(() => {
    const controller = new AbortController();

    async function fetchContacts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/support/contact", {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("دریافت پیام‌ها با خطا مواجه شد");
        }

        const data: Contact[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("ساختار اطلاعات دریافتی نامعتبر است");
        }

        setContacts(data);
      } catch (error) {
        if (controller.signal.aborted) return;

        setError(error instanceof Error ? error.message : "خطایی رخ داده است");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchContacts();

    return () => controller.abort();
  }, []);

  // جستجو با تاخیر 300 میلی‌ثانیه
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // حذف پیام از state بعد از DELETE موفق
  function handleDeleted(id: number) {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  }

  function handleSort() {
    setIsNewestFirst((prev) => !prev);
  }

  // جستجو و مرتب‌سازی
  const displayedCards = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLocaleLowerCase();

    const filtered = contacts.filter((contact) => {
      if (!normalizedSearch) return true;

      return [
        contact.full_name,
        contact.phone_number,
        contact.email,
        contact.message,
      ].some((value) =>
        String(value ?? "")
          .toLocaleLowerCase()
          .includes(normalizedSearch)
      );
    });

    return [...filtered].sort((a, b) => {
      const difference =
        new Date(b.created).getTime() - new Date(a.created).getTime();

      return isNewestFirst ? difference : -difference;
    });
  }, [contacts, debouncedSearch, isNewestFirst]);

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
        <button
          type="button"
          onClick={handleSort}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 py-2"
        >
          <ArrowDownUp className="size-4" />

          <p className="font-normal">
            {isNewestFirst ? "قدیمی‌ترین پیام‌ها" : "جدیدترین پیام‌ها"}
          </p>
        </button>
      </div>

      {/* عنوان ستون‌ها */}
      <div className="grid shrink-0 grid-cols-[0.5fr_1.25fr_0.75fr_1.5fr_1.25fr_1.25fr_0.5fr] gap-4 bg-secondary-bg px-6 py-4">
        {rows.map((row) => (
          <p className="text-sm font-normal text-muted-foreground" key={row}>
            {row}
          </p>
        ))}
      </div>

      {/* لیست پیام‌ها */}
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-2">
        {loading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            در حال دریافت پیام‌ها...
          </p>
        ) : error ? (
          <p className="py-8 text-center text-sm text-destructive">{error}</p>
        ) : displayedCards.length > 0 ? (
          displayedCards.map((contact) => (
            <DashbordCard
              key={contact.id}
              items={contact}
              onDeleted={handleDeleted}
            />
          ))
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            پیامی با این مشخصات پیدا نشد.
          </p>
        )}
      </div>
    </div>
  );
}