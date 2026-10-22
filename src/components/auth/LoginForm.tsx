"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

type FormErrors = {
  email?: string;
  password?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(email: string, password: string): FormErrors {
  const errors: FormErrors = {};

  if (!email.trim()) {
    errors.email = "ایمیل را وارد نکرده‌اید";
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = "فرمت ایمیل صحیح نیست";
  }

  if (!password) {
    errors.password = "رمز عبور را وارد نکرده‌اید";
  } else if (password.length < 8) {
    errors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد";
  }

  return errors;
}

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  
async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  setServerError("");

  const validationErrors = validate(email, password);
  setErrors(validationErrors);

  // اگر اعتبارسنجی فرم ناموفق بود، درخواست نفرست
  if (Object.keys(validationErrors).length > 0) return;

  setLoading(true);

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password,
      }),
    });

    const result = await response.json().catch(() => null);

    // نمایش خطای برگشتی از Route Handler
    if (!response.ok) {
      setServerError(
        result?.message || "ورود ناموفق بود. ایمیل و رمز عبور را بررسی کنید."
      );
      return;
    }

    // توکن قبلاً در Route Handler داخل کوکی ذخیره شده است.
    router.replace("/");
    router.refresh();
  } catch {
    setServerError("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="w-full max-w-md w90 py-5 md:shadow-lg md:rounded-lg md:bg-background">
      <div className="text-center flex gap-2 border-b border-border pb-3">
        {/*<Image
          src="/logo2.webp"
          alt="logo"
          width={50}
          height={50}
          className="w-10 h-7.5 md:w-12.5 md:h-10 lg:w-15 lg:h-12.5"
        />*/}
        {/* 20px = 5 , 30px = 7.5 , 40px = 10, 50px = 12.5 , 60px = 15 */}
        <h1 className="text-xl font-semibold text-start">ورود به پنل مدیریت</h1>
      </div>
      {/* 20px = 5 */}
      <div className="my-4">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 border-b-2 border-border pb-5"
        >
          <div className="flex flex-col">
            <div className="w-full flex items-center justify-between mb-3">
              <label htmlFor="email" className="text-sm font-medium px-1">
                ایمیل
              </label>
              {errors.email && (
                <div className="p-2">
                  <p
                    id="email-error"
                    className="text-sm text-destructive font-normal"
                  >
                    {errors.email}
                  </p>
                </div>
              )}
            </div>
            {/* 56px = 14*/}
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="border  border-border outline-none rounded-lg p-2 w-full px-4 h-13 bg-background"
            />
          </div>
          <div className="flex flex-col">
            <div className="w-full flex items-center justify-between mb-3">
              <label htmlFor="password" className="text-sm font-medium px-1">
                رمز عبور
              </label>
              {errors.password && (
                <div className="p-2">
                  <p
                    id="password-error"
                    className="text-sm text-destructive font-normal"
                  >
                    {errors.password}
                  </p>
                </div>
              )}
            </div>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className="border border-border outline-none rounded-lg p-2 w-full    px-4 h-13 bg-background"
            />
          </div>
          {serverError && (
            <p
              role="alert"
              className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
            >
              {serverError}
            </p>
          )}
          {/* 40px = 10 */}
          <button
            className="border border-border bg-brand text-background cursor-pointer rounded-lg w-full flex items-center justify-center gap-2 h-13 mt-10 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            <LogIn />
            <span className="mb-2">
              {loading ? "در حال ورود به پنل..." : "ورود به پنل"}
            </span>
          </button>
          
        </form>
        <div className="text-center flex items-center justify-center gap-2 my-4">
          <h6 className="text-sm text-muted-foreground ">
            دسترسی به این بخش برای کاربران مجاز امکان پذیر است
          </h6>
        </div>
      </div>
    </div>
  );
}
