import { fetchBackend } from "@/shared/helpers/server-fetcher";
import { NextRequest, NextResponse } from "next/server";
import QueryString from "qs";

interface LaravelPaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  path: string;
  per_page: number;
  to: number | null;
  total: number;
  links: { url: string | null; label: string; active: boolean }[];
}

interface LaravelPaginationResponse<T> {
  success: boolean;
  status: number;
  message?: string;
  data: T[];
  meta: LaravelPaginationMeta;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const parsed = QueryString.parse(searchParams.toString(), {
    ignoreQueryPrefix: true,
  });

  const finalParams = new URLSearchParams();

  // Search
  if (parsed.search) {
    const searchValue = String(parsed.search);
    if (searchValue.trim()) {
      finalParams.set("search", searchValue);
    }
  }

  // Search Field - handle multiple fields for Laravel's orWhere
  if (parsed.searchFields) {
    const fields = Array.isArray(parsed.searchFields)
      ? parsed.searchFields
      : [parsed.searchFields];
    const validFields = fields.filter((f: unknown) => typeof f === "string");
    if (validFields.length > 0) {
      finalParams.set("searchFields", JSON.stringify(validFields));
    }
  }

  // Filters - handle Laravel's where clauses
  if (parsed.filters) {
    try {
      const filters = Array.isArray(parsed.filters)
        ? parsed.filters
        : [parsed.filters];
      const validFilters = filters.filter((f: unknown) => {
        if (!f || typeof f !== "object") return false;
        const obj = f as Record<string, unknown>;
        return obj.field && obj.value !== undefined && obj.value !== null;
      });
      if (validFilters.length > 0) {
        finalParams.set("filters", JSON.stringify(validFilters));
      }
    } catch (error) {
      console.error("Error parsing filters:", error);
    }
  }

  // Sort - handle Laravel's orderBy
  if (parsed.sort) {
    try {
      const sortConfig = Array.isArray(parsed.sort)
        ? parsed.sort
        : [parsed.sort];
      const validSorts = sortConfig.filter((s: unknown) => {
        if (!s || typeof s !== "object") return false;
        const sortObj = s as Record<string, unknown>;
        return sortObj.field && ["asc", "desc"].includes(String(sortObj.order));
      });
      if (validSorts.length > 0) {
        finalParams.set("sort", JSON.stringify(validSorts));
      }
    } catch (error) {
      console.error("Error parsing sort:", error);
    }
  }

  // Cursor for cursor-based pagination
  if (parsed.cursor) {
    const cursorValue = String(parsed.cursor);
    if (cursorValue.trim()) {
      finalParams.set("cursor", cursorValue);
    }
  }

  // Limit - default to 15, max 100
  if (parsed.limit) {
    let limitValue = Number(parsed.limit);
    if (isNaN(limitValue) || limitValue < 1) {
      limitValue = 15;
    }
    limitValue = Math.min(limitValue, 100);
    finalParams.set("limit", String(limitValue));
  }

  // Handle empty search - Laravel backend might expect empty string
  if (finalParams.toString() === "") {
    finalParams.set("limit", "15");
  }

  const [status, data] = await fetchBackend<LaravelPaginationResponse<unknown>>(
    `/users?${finalParams.toString()}`,
  );

  if (!data.success) {
    return NextResponse.json(
      {
        success: false,
        status: status,
        message: data.message || "Failed to fetch users",
        errors: data.errors || null,
      },
      { status },
    );
  }

  return NextResponse.json(
    {
      success: true,
      status: status,
      // data: (data as LaravelPaginationResponse<unknown>).data,
      // meta: (data as LaravelPaginationResponse<unknown>).meta,
    },
    { status },
  );
}
