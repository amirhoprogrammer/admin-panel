"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormField } from "../FormField";

interface CategoryFormValues {
  name: string;
}

export default function AddCategory() {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: CategoryFormValues) {
    setServerError("");
    setSuccess("");

    try {
      const response = await fetch("/api/shop/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          parent_id: null,
        }),
      });

      if (!response.ok) {
        throw new Error("ثبت دسته‌بندی با خطا مواجه شد");
      }

      setSuccess("دسته‌بندی با موفقیت ثبت شد");

      reset();
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "خطایی رخ داده است"
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-1 rounded-lg bg-background"
    >
      <aside className="w-[20%] rounded-r-lg border-l border-border bg-brand p-4">
        <h2 className="text-justify text-[16px] font-semibold text-foreground">
          افزودن به صفحه اصلی
        </h2>

        <p className="mt-2 text-justify text-[12px] text-muted-foreground">
          در این بخش می‌توانید دسته‌بندی‌های اصلی محصولات فروشگاه را ایجاد کنید.
          برای ثبت دسته‌بندی، نام آن را وارد کرده و روی دکمه ثبت کلیک کنید.
        </p>
      </aside>

      <div className="w-[80%] p-4">
        <FormField
          label="نام دسته بندی"
          placeholder="نام دسته بندی وارد کنید"
          register={register("name", {
            required: "نام دسته‌بندی الزامی است",
            validate: (value) =>
              value.trim().length > 0 || "نام دسته‌بندی نمی‌تواند خالی باشد",
          })}
          error={errors.name}
          disabled={isSubmitting}
        />

        {serverError && (
          <p className="mt-3 text-sm text-red-500">{serverError}</p>
        )}

        {success && <p className="mt-3 text-sm text-green-600">{success}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 cursor-pointer rounded-lg bg-brand p-3 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "در حال ثبت..." : "ثبت دسته بندی"}
        </button>
      </div>
    </form>
  );
}