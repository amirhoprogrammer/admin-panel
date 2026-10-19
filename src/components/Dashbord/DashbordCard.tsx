"use client";
import {
  CalendarDays,
  Mail,
  MessageSquareText,
  Phone,
  Trash,
  User,
} from "lucide-react";
import React, { useState } from "react";
import Modal from "../other/Modal";
interface Cards {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  day: number;
  month: string;
  year: number;
  hour: number;
  minute: number;
}
const dates = (
  day: number,
  month: string,
  year: number,
  hour: number,
  minute: number
): string | null => {
  let hours = "";
  let minutes = "";
  if (hour <= 0 || minute <= 0) {
    return null;
  } else if (hour < 10) {
    hours = "0" + hour;
    if (minute < 10) {
      minutes = "0" + minute;
    } else {
      minutes = `${minute}`;
    }
  } else if (minute < 10) {
    minutes = "0" + minute;
    if (hour < 10) {
      hours = "0" + hour;
    } else {
      hours = `${hour}`;
    }
  } else {
    hours = `${hour}`;
    minutes = `${minute}`;
  }
  const date = `${year} ${month} ${day} , ${minutes} : ${hours}`;
  return date;
};
export default function DashbordCard({ items }: { items: Cards }) {
  const [selected, setSelected] = useState(0);
  return (
    <div
      onClick={() => setSelected(1)}
      className="flex items-center justify-between rounded-lg border border-border px-2 py-2"
    >
      <p className="font-normal text-muted-foreground">{items.id}</p>
      <p className="font-normal">{items.name}</p>
      <p className="font-normal text-muted-foreground">{items.phone}</p>
      <p className="font-normal text-muted-foreground">{items.email}</p>
      {/* 75px = 18.75 */}
      <p
        className="font-normal text-muted-foreground w-18.75 truncate"
        dir="ltr"
      >
        {items.message}
      </p>
      <p className="font-normal text-muted-foreground">
        {dates(items.day, items.month, items.year, items.hour, items.minute)}
      </p>
      <button className="bg-delete rounded-lg py-4 px-4 flex gap-2">
        <Trash className="text-destructive size-4.5 mt-1" />
        <p className="text-destructive font-semibold text-sm">حذف</p>
      </button>
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(0)}
        title="جزییات پیام"
      >
        {selected == 1 && (
          <div className="rounded-lg w-full flex flex-col overflow-hidden">
            <div className="flex w-full">
              <div className="w-[50%] items-center justify-center p-2 border-border border">
                <div className="flex px-2 py-2 gap-2">
                  <User />
                  <p className="text-sm text-muted-foreground">
                    نام و نام خانوادگی
                  </p>
                </div>
                <div className="px-2 py-2">
                  <p className="text-sm text-muted-foreground">{items.name}</p>
                </div>
              </div>
              <div className="w-[50%] items-center justify-center p-2 border-border border">
                <div className="flex px-2 py-2 gap-2">
                  <Phone />
                  <p className="text-sm text-muted-foreground">شماره همراه</p>
                </div>
                <div className="px-2 py-2">
                  <p className="text-sm text-muted-foreground">{items.phone}</p>
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <div className="w-[50%] items-center justify-center p-2 border-border border">
                <div className="flex px-2 py-2 gap-2">
                  <Mail />
                  <p className="text-sm text-muted-foreground">ایمیل</p>
                </div>
                <div className="px-2 py-2">
                  <p className="text-sm text-muted-foreground">{items.email}</p>
                </div>
              </div>
              <div className="w-[50%] items-center justify-center p-2 border-border border">
                <div className="flex px-2 py-2 gap-2">
                  <CalendarDays />
                  <p className="text-sm text-muted-foreground">تاریخ ثبت</p>
                </div>
                <div className="px-2 py-2">
                  <p className="text-sm text-muted-foreground">
                    {dates(
                      items.day,
                      items.month,
                      items.year,
                      items.hour,
                      items.minute
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="my-2 flex flex-col gap-4">
              <div className="flex gap-2">
                <MessageSquareText className="text-brand" />
                <p className="text-base font-semibold">متن پیام</p>
              </div>
              <div className="px-4 bg-secondary-bg rounded-lg">
                {items.message}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
