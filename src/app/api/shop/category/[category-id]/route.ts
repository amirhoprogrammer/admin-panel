import { NextResponse } from "next/server";
import { serverApi } from "@/lib/server-api";

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ "category-id": string }>;
  }
) {
  try {
    const { "category-id": categoryId } = await params;

    const id = Number(categoryId);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return NextResponse.json(
        { error: "شناسه دسته‌بندی نامعتبر است" },
        { status: 400 }
      );
    }

    const data = await serverApi(`/shop/category/${id}`, {
      method: "DELETE",
    });

    return NextResponse.json(
      data ?? {
        message: "دسته‌بندی با موفقیت حذف شد",
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
