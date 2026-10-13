"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate(email, password);
    setErrors(validationErrors);

    // اگر خطایی وجود داشت، متوقف شو
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      // TODO: وقتی API آماده شد، درخواست لاگین را اینجا بفرست
      // const res = await fetch("/api/login", { ... });

      // فعلاً: ریدایرکت به همین صفحه
      router.push("/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md shadow-xl w90 py-5 rounded-lg">
      <div className="text-center">
        <h1 className="text-2xl">ورود به پنل</h1>
        <p>ایمیل و رمز عبور خود را وارد کنید</p>
      </div>
      <div className="m-4">
        {/* noValidate: جلوگیری از پیام‌های پیش‌فرض مرورگر */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* ایمیل */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <label htmlFor="email">ایمیل</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                dir="ltr"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="border-b-2 border-foreground outline-none"
              />
            </div>

            {errors.email && (
              <p id="email-error" className="text-sm text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          {/* رمز عبور */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <label htmlFor="password">رمز عبور</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                dir="ltr"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className="border-b-2 border-foreground outline-none"
              />
            </div>

            {errors.password && (
              <p id="password-error" className="text-sm text-destructive">
                {errors.password}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "در حال ورود..." : "ورود"}
          </Button>
        </form>
      </div>
    </div>
  );
}
