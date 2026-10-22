"use client";

import { useState, useEffect } from "react";
import { ArrowDownUp, Search } from "lucide-react";
import DashbordCard from "./DashbordCard";
import { DashbordCardItem } from "@/data/dashbord";
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
  const [isNewestFirst, setIsNewestFirst] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  function handleSort() {
    setIsNewestFirst((prev) => !prev);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const normalizedSearch = debouncedSearch.trim().toLocaleLowerCase();

  const filteredCards = DashbordCardItem.filter((card) => {
    if (!normalizedSearch) return true;

    return [card.name, card.email, card.message, card.phone].some((value) =>
      String(value ?? "")
        .toLocaleLowerCase()
        .includes(normalizedSearch)
    );
  });
  const displayedCards = [...filteredCards].sort((a, b) =>
    isNewestFirst ? b.id - a.id : a.id - b.id
  );
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-background">
      <div className="flex shrink-0 items-center justify-between py-4 px-2 min-h-0">
        <div className="shrink-0 hidden lg:block">
          {/* 300px = 75 */}
          <div className="relative w-75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search text-muted-foreground absolute top-1/2 right-3 size-4 -translate-y-1/2"
              aria-hidden="true"
            >
              <path d="m21 21-4.34-4.34"></path>
              <circle cx="11" cy="11" r="8"></circle>
            </svg>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="جستجوی نام و شماره ، ایمیل و پیام..."
              className="border-border bg-secondary-bg text-foreground placeholder:text-muted-foreground h-10.5 w-full rounded-lg border pr-10 pl-3 text-sm outline-none transition-colors
              focus:border-brand"
            />
          </div>
        </div>
        <button
          type="button"
          aria-label="جستجو"
          className="flex size-11 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:border-brand hover:text-brand lg:hidden"
        >
          <Search className="size-5" />
        </button>

        <button
          type="button"
          onClick={handleSort}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 py-2"
        >
          <ArrowDownUp className="size-4" />

          <p className="mb-1 font-normal">
            {isNewestFirst ? "قدیمی‌ترین پیام‌ها" : "جدیدترین پیام‌ها"}
          </p>
        </button>
      </div>
      <div className="bg-secondary-bg shrink-0 grid grid-cols-[0.5fr_1.25fr_0.75fr_1.5fr_1.25fr_1.25fr_0.5fr] py-4 px-6 gap-4">
        {rows.map((row, id) => (
          <p className="font-normal text-sm text-muted-foreground" key={id}>
            {row}
          </p>
        ))}
      </div>
      {/* 450px = 112.5 */}

      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-2">
        {displayedCards.length > 0 ? (
          displayedCards.map((card, id) => (
            <DashbordCard items={card} key={id} />
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
