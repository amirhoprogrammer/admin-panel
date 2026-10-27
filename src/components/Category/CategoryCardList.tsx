//"use client";

//import { Eye, Pencil, Trash } from "lucide-react";
//import Link from "next/link";
//import { useState } from "react";
//import type { Category } from "@/lib/schemas/category";

//interface CategoryCardListProps {
//  category: Category;
//  onDeleted: (id: number) => void;
//}

//export default function CategoryCardList({
//  category,
//  onDeleted,
//}: CategoryCardListProps) {
//  const [isDeleting, setIsDeleting] = useState(false);
//  const [deleteError, setDeleteError] = useState("");

//  async function handleDelete() {
//    if (isDeleting) return;

//    const confirmed = window.confirm(
//      `آیا از حذف دسته‌بندی "${category.name}" مطمئن هستید؟`
//    );

//    if (!confirmed) return;

//    try {
//      setIsDeleting(true);
//      setDeleteError("");

//      const response = await fetch(`/api/shop/category/${category.id}`, {
//        method: "DELETE",
//      });

//      if (!response.ok) {
//        throw new Error("حذف دسته‌بندی با خطا مواجه شد");
//      }

//      onDeleted(category.id);
//    } catch (error) {
//      setDeleteError(
//        error instanceof Error ? error.message : "خطایی رخ داده است"
//      );
//    } finally {
//      setIsDeleting(false);
//    }
//  }

//  return (
//    <>
//      <div className="grid grid-cols-[0.75fr_5.25fr_6fr] rounded-lg border border-border px-2 py-2 my-2">
//        {/* ترتیب دسته‌بندی */}
//        <div className="flex items-center text-muted-foreground">
//          {category.index}
//        </div>

//        {/* نام دسته‌بندی */}
//        <p className="flex items-center text-base font-semibold">
//          {category.name}
//        </p>

//        {/* عملیات */}
//        <div className="flex items-center justify-center gap-2">
//          {/* مشاهده */}
//          <Link
//            href={`/categories/${category.id}`}
//            className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 hover:bg-brand"
//          >
//            <Eye className="mt-1 size-4.5 text-foreground" />

//            <p className="text-sm font-semibold text-foreground">مشاهده</p>
//          </Link>

//          {/* ویرایش */}
//          <Link
//            href={`/categories/${category.id}/edit`}
//            className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 hover:bg-brand"
//          >
//            <Pencil className="mt-1 size-4.5 text-foreground" />

//            <p className="text-sm font-semibold text-foreground">ویرایش</p>
//          </Link>

//          {/* حذف */}
//          <button
//            type="button"
//            onClick={handleDelete}
//            disabled={isDeleting}
//            className="flex cursor-pointer items-center gap-2 rounded-lg bg-delete px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
//          >
//            <Trash className="mt-1 size-4.5 text-destructive" />

//            <p className="text-sm font-semibold text-destructive">
//              {isDeleting ? "در حال حذف..." : "حذف"}
//            </p>
//          </button>
//        </div>
//      </div>

//      {deleteError && (
//        <p className="my-2 text-sm text-destructive">{deleteError}</p>
//      )}
//    </>
//  );
//}
"use client";

import { Eye, EyeOff, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Category } from "@/lib/schemas/category";

interface CategoryCardListProps {
  category: Category;
  categories: Category[];
  onDeleted: (id: number) => void;
  level?: number;
  ancestorIds?: number[];
}

export default function CategoryCardList({
  category,
  categories,
  onDeleted,
  level = 0,
  ancestorIds = [],
}: CategoryCardListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // پیدا کردن زیردسته‌های مستقیم
  const children = useMemo(() => {
    return categories
      .filter(
        (item) =>
          item.parent?.id === category.id &&
          !ancestorIds.includes(item.id) &&
          item.id !== category.id
      )
      .sort((a, b) => a.index - b.index);
  }, [categories, category.id, ancestorIds]);

  const hasChildren = children.length > 0;

  // حذف دسته‌بندی
  async function handleDelete() {
    if (isDeleting) return;

    const confirmed = window.confirm(
      `آیا از حذف دسته‌بندی "${category.name}" مطمئن هستید؟`
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);
      setDeleteError("");

      const response = await fetch(`/api/shop/category/${category.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("حذف دسته‌بندی با خطا مواجه شد");
      }

      onDeleted(category.id);
    } catch (error) {
      setDeleteError(
        error instanceof Error ? error.message : "خطایی رخ داده است"
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="w-full">
      {/* کارت دسته‌بندی */}
      <div
        className="my-2 grid grid-cols-[0.75fr_5.25fr_6fr] rounded-lg border border-border px-2 py-2"
        style={{
          marginRight: level * 24,
        }}
      >
        {/* ترتیب */}
        <div className="flex items-center text-muted-foreground">
          {category.index}
        </div>

        {/* نام دسته‌بندی */}
        <p className="flex items-center text-base font-semibold">
          {category.name}
        </p>

        {/* عملیات */}
        <div className="flex items-center justify-center gap-2">
          {/* مشاهده / بستن */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            disabled={!hasChildren}
            aria-expanded={isOpen}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isOpen ? (
              <EyeOff className="mt-1 size-4.5 text-foreground" />
            ) : (
              <Eye className="mt-1 size-4.5 text-foreground" />
            )}

            <p className="text-sm font-semibold text-foreground">
              {isOpen ? "بستن" : "مشاهده"}
            </p>
          </button>

          {/* ویرایش */}
          <Link
            href={`/categories/${category.id}/edit`}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 hover:bg-brand"
          >
            <Pencil className="mt-1 size-4.5 text-foreground" />

            <p className="text-sm font-semibold text-foreground">ویرایش</p>
          </Link>

          {/* حذف */}
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-delete px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash className="mt-1 size-4.5 text-destructive" />

            <p className="text-sm font-semibold text-destructive">
              {isDeleting ? "در حال حذف..." : "حذف"}
            </p>
          </button>
        </div>
      </div>

      {/* نمایش خطای حذف */}
      {deleteError && (
        <p className="my-2 text-sm text-destructive">{deleteError}</p>
      )}

      {/* نمایش زیردسته‌ها */}
      {isOpen && hasChildren && (
        <div className="w-full">
          {children.map((child) => (
            <CategoryCardList
              key={child.id}
              category={child}
              categories={categories}
              onDeleted={onDeleted}
              level={level + 1}
              ancestorIds={[...ancestorIds, category.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
}