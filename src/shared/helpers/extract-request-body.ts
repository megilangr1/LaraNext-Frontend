import { NextRequest } from "next/server";
import { ErrorResponse } from "../types/api-response";

export type ExtractBodyResult =
  | {
      ok: true;
      body: BodyInit; // tetap BodyInit
      error: undefined;
    }
  | {
      ok: false;
      body: undefined;
      error: ErrorResponse;
    };

export async function extractRequestBody(
  req: NextRequest,
): Promise<ExtractBodyResult> {
  const contentType = req.headers.get("content-type") || "";

  try {
    // JSON
    if (contentType.includes("application/json")) {
      const json = await req.json();
      return { ok: true, body: JSON.stringify(json), error: undefined };
    }

    // Multipart/FormData
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      return {
        ok: true,
        body: formData,
        error: undefined,
      };
    }

    // URL-encoded form
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      return { ok: true, body: text, error: undefined };
    }

    return {
      ok: false,
      body: undefined,
      error: {
        success: false,
        code: "500",
        message: `Unsupported Content-Type: ${contentType}`,
        errors: null,
      },
    };
  } catch {
    return {
      ok: false,
      body: undefined,
      error: {
        success: false,
        code: "500",
        message: "Something went wrong !",
        errors: null,
      },
    };
  }
}
