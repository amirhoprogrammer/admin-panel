import { NextResponse } from "next/server";
import { serverApi } from "@/lib/server-api";

export async function GET() {
  try {
    const data = await serverApi("/shop/category", {
      method: "GET",
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    const apiError = error as {
      body?: unknown;
      status?: number;
    };

    return NextResponse.json(
      { error: apiError.body ?? "Internal Server Error" },
      { status: apiError.status ?? 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (typeof body.name !== "string" || !body.name.trim()) {
      return NextResponse.json(
        { error: "نام دسته‌بندی الزامی است" },
        { status: 400 }
      );
    }

    const data = await serverApi("/shop/category", {
      method: "POST",
      body: JSON.stringify({
        name: body.name.trim(),
        parent_id: null,
      }),
    });

    return NextResponse.json(
      data ?? {
        message: "دسته‌بندی با موفقیت ایجاد شد",
      }
    );
  } catch (error: unknown) {
    const apiError = error as {
      body?: unknown;
      status?: number;
    };

    return NextResponse.json(
      {
        error: apiError.body ?? "Internal Server Error",
      },
      {
        status: apiError.status ?? 500,
      }
    );
  }
}
