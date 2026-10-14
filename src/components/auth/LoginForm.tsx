"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
      router.push("/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md shadow-xl w90 py-5 rounded-lg bg-background">
      <div className="text-center flex items-center justify-between">
        <h1 className="text-2xl ">ورود به پنل</h1>
        {/* 20px = 5 , 30px = 7.5 , 40px = 10, 50px = 12.5*/}
        <Image
          src="/logo2.webp"
          alt="logo"
          width={50}
          height={50}
          className="w-7.5 h-5 md:w-10 md:h-7.5 lg:w-12.5 lg:h-10"
        />
      </div>
      <div className="m-4">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="space-y-4 min-h-8">
            <div className="flex flex-col xs:flex-row xs:gap-2 ">
              {/* 56px = 14*/}
              <label htmlFor="email" className="min-w-18  text-xl py-2">
                ایمیل:
              </label>
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
                className="border-2 border-border outline-none rounded-lg p-2 bg-input shadow-2xl"
              />
            </div>

            {errors.email && (
              <div className="bg-destructive p-2 rounded-lg shadow-2xl">
                <p id="email-error" className="text-sm text-background">
                  {errors.email}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4 min-h-8">
            <div className="flex flex-col xs:flex-row  xs:gap-2">
              <label htmlFor="password" className="text-xl py-2">
                رمز عبور:
              </label>
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
                className="border-2 border-border outline-none rounded-lg p-2 bg-input shadow-2xl"
              />
            </div>

            {errors.password && (
              <div className="bg-destructive p-2 rounded-lg shadow-2xl">
                <p id="password-error" className="text-sm text-background">
                  {errors.password}
                </p>
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            variant="neutral"
          >
            {loading ? "در حال ورود..." : "ورود"}
          </Button>
        </form>
      </div>
    </div>
  );
}
