"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";

import { loginSchema, type LoginFormValues } from "@/lib/schemas/login-schema";

//const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//function validate(email: string, password: string): FormErrors {
//  const errors: FormErrors = {};

//  if (!email.trim()) {
//    errors.email = "ایمیل را وارد نکرده‌اید";
//  } else if (!EMAIL_REGEX.test(email.trim())) {
//    errors.email = "فرمت ایمیل صحیح نیست";
//  }

//  if (!password) {
//    errors.password = "رمز عبور را وارد نکرده‌اید";
//  } else if (password.length < 8) {
//    errors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد";
//  }

//  return errors;
//}

export default function LoginForm() {
  const router = useRouter();
  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  //const [errors, setErrors] = useState<FormErrors>({});
  //const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

   const {
     register,
     handleSubmit,
     formState: { errors, isSubmitting },
   } = useForm<LoginFormValues>({
     resolver: zodResolver(loginSchema),
     mode: "onTouched",
     defaultValues: {
       email: "",
       password: "",
     },
   });
  
  async function handleLogin(values: LoginFormValues) {
    setServerError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setServerError(
          result?.detail ||
            result?.message ||
            "ورود ناموفق بود. ایمیل و رمز عبور را بررسی کنید."
        );
        return;
      }

      // Route Handler توکن را در کوکی HttpOnly ذخیره می‌کند.
      router.replace("/");
      router.refresh();
    } catch {
      setServerError("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
    }
  }

  
//async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//  e.preventDefault();

//  setServerError("");

//  const validationErrors = validate(email, password);
//  setErrors(validationErrors);

//  // اگر اعتبارسنجی فرم ناموفق بود، درخواست نفرست
//  if (Object.keys(validationErrors).length > 0) return;

//  setLoading(true);

//  try {
//    const response = await fetch("/api/login", {
//      method: "POST",
//      headers: {
//        "Content-Type": "application/json",
//      },
//      body: JSON.stringify({
//        email: email.trim(),
//        password,
//      }),
//    });

//    const result = await response.json().catch(() => null);

//    // نمایش خطای برگشتی از Route Handler
//    if (!response.ok) {
//      setServerError(
//        result?.message || "ورود ناموفق بود. ایمیل و رمز عبور را بررسی کنید."
//      );
//      return;
//    }

//    // توکن قبلاً در Route Handler داخل کوکی ذخیره شده است.
//    router.replace("/");
//    router.refresh();
//  } catch {
//    setServerError("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
//  } finally {
//    setLoading(false);
//  }
//}


  return (
    <div className="w90 w-full max-w-md rounded-lg py-5 md:bg-background md:shadow-lg">
      <div className="flex gap-2 border-b border-border pb-3 text-center">
        <h1 className="text-start text-xl font-semibold">ورود به پنل مدیریت</h1>
      </div>

      <div className="my-4">
        <form
          onSubmit={handleSubmit(handleLogin)}
          noValidate
          className="space-y-4 border-b-2 border-border pb-5"
        >
          {/* Email */}
          <div className="flex flex-col">
            <div className="mb-3 flex w-full items-center justify-between">
              <label htmlFor="email" className="px-1 text-sm font-medium">
                ایمیل
              </label>

              {errors.email && (
                <p
                  id="email-error"
                  className="p-2 text-sm font-normal text-destructive"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="you@example.com"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="h-13 w-full rounded-lg border border-border bg-background px-4 p-2 outline-none focus:border-brand"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <div className="mb-3 flex w-full items-center justify-between">
              <label htmlFor="password" className="px-1 text-sm font-medium">
                رمز عبور
              </label>

              {errors.password && (
                <p
                  id="password-error"
                  className="p-2 text-sm font-normal text-destructive"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("password")}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className="h-13 w-full rounded-lg border border-border bg-background px-4 p-2 outline-none focus:border-brand"
            />
          </div>

          {/* Server error */}
          {serverError && (
            <p
              role="alert"
              className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
            >
              {serverError}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-10 flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-brand text-background disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn />

            <span>
              {isSubmitting ? "در حال ورود به پنل..." : "ورود به پنل"}
            </span>
          </button>
        </form>

        <div className="my-4 flex items-center justify-center gap-2 text-center">
          <p className="text-sm text-muted-foreground">
            دسترسی به این بخش برای کاربران مجاز امکان‌پذیر است
          </p>
        </div>
      </div>
    </div>
  );
}
