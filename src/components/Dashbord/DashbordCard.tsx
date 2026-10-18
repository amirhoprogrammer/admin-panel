import { Trash } from "lucide-react";
import React from "react";
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
  } else if (minute < 10) {
    minutes = "0" + hour;
  }
  const date = `${hours} : ${minutes} , ${year} ${month} ${day}`;
  return date;
};
export default function DashbordCard({ items }: { items: Cards }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border px-2 py-2">
      <p className="font-normal text-muted-foreground">{items.id}</p>
      <p className="font-normal">{items.name}</p>
      <p className="font-normal text-muted-foreground">{items.phone}</p>
      <p className="font-normal text-muted-foreground">{items.email}</p>
      {/* 75px = 18.75 */}
      <p className="font-normal text-muted-foreground w-18.75 truncate">
        {items.message}
      </p>
      <p className="font-normal text-muted-foreground">
        {dates(items.day, items.month, items.year, items.hour, items.minute)}
      </p>
      <button className="bg-delete rounded-lg py-4 px-4 flex gap-2">
        <Trash className="text-destructive" />
        <p className="text-destructive font-normal text-base">حذف</p>
      </button>
    </div>
  );
}
