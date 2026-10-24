"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        cache: "no-store",
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setError(result?.detail || "خروج انجام نشد.");
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setError("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className="relative inline-flex h-12 cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg bg-primary px-5 text-base font-medium text-primary-foreground transition-all duration-200 hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-50 xl:h-11 xl:px-4 xl:text-sm 2xl:h-12"
      >
        <LogOut className="size-5" />

        <span className="mb-1 inline-flex shrink-0 font-semibold">
          {loading ? "در حال خروج..." : "خروج"}
        </span>
      </button>

      {error && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
