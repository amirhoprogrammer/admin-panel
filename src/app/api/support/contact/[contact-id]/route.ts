import { NextResponse } from "next/server";
import { serverApi } from "@/lib/server-api";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ "contact-id": string }> }
) {
  try {
    const { "contact-id": contactId } = await params;

    const data = await serverApi(`/support/contact/${contactId}`, {
      method: "DELETE",
    });

    return NextResponse.json(
      data ?? {
        message: "Message deleted successfully",
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
