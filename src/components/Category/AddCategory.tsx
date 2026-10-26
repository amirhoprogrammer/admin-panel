import React from "react";
import DashbordHeader from "../Dashbord/DashbordHeader";
import { DashbordBodyItems } from "@/data/dashbord";

export default function AddCategory() {
    return (
      <form className="flex bg-background rounded-lg">
        <aside className="bg-brand">
          <h2 className="text-justify text-foreground">افزودن به صفحه اصلی</h2>
          <p className="text-justify text-muted-foreground">
            در این بخش می‌توانید دسته‌بندی‌های اصلی محصولات فروشگاه را ایجاد
            کنید. برای ثبت دسته‌بندی، نام آن را وارد کرده و روی دکمه ثبت کلیک
            کنید.
          </p>
        </aside>
        <div>
          <button></button>
        </div>
      </form>
    );
}
