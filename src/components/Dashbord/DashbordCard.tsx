"use client";

import {
  CalendarDays,
  Mail,
  MessageSquareText,
  Phone,
  Trash,
  User,
} from "lucide-react";

import { useState } from "react";
import Modal from "../other/Modal";
import type { Contact } from "@/lib/schemas/contact";

interface DashbordCardProps {
  items: Contact;
  onDeleted: (id: number) => void;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "تاریخ نامعتبر";
  }

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function DashbordCard({ items, onDeleted }: DashbordCardProps) {
  const [selected, setSelected] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  async function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    if (isDeleting) return;

    const confirmed = window.confirm("آیا از حذف این پیام مطمئن هستید؟");

    if (!confirmed) return;

    try {
      setIsDeleting(true);
      setDeleteError("");

      const response = await fetch(`/api/support/contact/${items.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("حذف پیام با خطا مواجه شد");
      }

      setSelected(false);
      onDeleted(items.id);
    } catch (error) {
      setDeleteError(
        error instanceof Error ? error.message : "خطایی رخ داده است"
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div
        onClick={() => setSelected(true)}
        className="my-2 grid cursor-pointer grid-cols-[0.5fr_1.25fr_0.75fr_1.5fr_1.25fr_1.25fr_0.5fr] items-center gap-4 rounded-lg border border-border px-2 py-4"
      >
        <p className="text-sm text-muted-foreground">{items.id}</p>

        <p className="text-sm font-semibold">{items.full_name}</p>

        <p className="text-sm text-muted-foreground">{items.phone_number}</p>

        <p className="break-all text-sm text-muted-foreground">{items.email}</p>
        {/* break-words = wrap-break-word*/}
        <p className="line-clamp-2 text-justify text-sm text-muted-foreground wrap-break-word">
          {items.message}
        </p>

        <p className="text-sm text-muted-foreground">
          {formatDate(items.created)}
        </p>

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

      {deleteError && <p className="text-sm text-destructive">{deleteError}</p>}

      <Modal
        isOpen={selected}
        onClose={() => setSelected(false)}
        title="جزییات پیام"
      >
        <div className="flex w-full flex-col overflow-hidden rounded-lg">
          {/* نام و شماره تماس */}
          <div className="flex w-full">
            <div className="w-[50%] border border-border p-2">
              <div className="flex gap-2 px-2 py-2">
                <User />
                <p className="text-sm text-muted-foreground">
                  نام و نام خانوادگی
                </p>
              </div>

              <div className="px-2 py-2">
                <p className="text-sm text-muted-foreground">
                  {items.full_name}
                </p>
              </div>
            </div>

            <div className="w-[50%] border border-border p-2">
              <div className="flex gap-2 px-2 py-2">
                <Phone />
                <p className="text-sm text-muted-foreground">شماره همراه</p>
              </div>

              <div className="px-2 py-2">
                <p className="text-sm text-muted-foreground">
                  {items.phone_number}
                </p>
              </div>
            </div>
          </div>

          {/* ایمیل و تاریخ */}
          <div className="flex w-full">
            <div className="w-[50%] border border-border p-2">
              <div className="flex gap-2 px-2 py-2">
                <Mail />
                <p className="text-sm text-muted-foreground">ایمیل</p>
              </div>

              <div className="px-2 py-2">
                <p className="break-all text-sm text-muted-foreground">
                  {items.email}
                </p>
              </div>
            </div>

            <div className="w-[50%] border border-border p-2">
              <div className="flex gap-2 px-2 py-2">
                <CalendarDays />
                <p className="text-sm text-muted-foreground">تاریخ ثبت</p>
              </div>

              <div className="px-2 py-2">
                <p className="text-sm text-muted-foreground">
                  {formatDate(items.created)}
                </p>
              </div>
            </div>
          </div>

          {/* متن کامل پیام */}
          <div className="my-2 flex flex-col gap-4">
            <div className="flex gap-2">
              <MessageSquareText className="text-brand" />

              <p className="text-base font-semibold">متن پیام</p>
            </div>
            {/* break-words = wrap-break-word*/}
            <div className="rounded-lg bg-secondary-bg px-4 py-3">
              <p className="whitespace-pre-wrap wrap-break-word text-sm leading-7">
                {items.message}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}