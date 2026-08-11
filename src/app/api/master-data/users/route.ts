import { extractRequestBody } from "@/shared/helpers/extract-request-body";
import { fetchBackend } from "@/shared/helpers/server-fetcher";
import { sleep } from "@/shared/helpers/server-helper";
import { NextRequest, NextResponse } from "next/server";
import QueryString from "qs";

export async function GET(req: NextRequest) {
  await sleep(1000);

  const { searchParams } = new URL(req.url);

  const parsed = QueryString.parse(searchParams.toString(), {
    ignoreQueryPrefix: true,
  });

  const finalParams = new URLSearchParams();

  // Search
  if (parsed.search) finalParams.set("search", parsed.search as string);

  // Sort
  if (parsed.sortBy) finalParams.set("sortBy", parsed.sortBy as string);
  if (parsed.sortType)
    finalParams.set("sortType", parsed.sortType === "desc" ? "desc" : "asc");

  // Limit
  if (parsed.limit) finalParams.set("limit", String(parsed.limit));

  // Page
  if (parsed.page) finalParams.set("page", String(parsed.page));

  const [status, data] = await fetchBackend(
    `/v1/master-data/users?${finalParams.toString()}`,
  );

  return NextResponse.json(data, { status });
}

export async function POST(req: NextRequest) {
  const { ok, body, error } = await extractRequestBody(req);
  if (!ok) return NextResponse.json(error, { status: 400 });

  const [status, data] = await fetchBackend(`/v1/master-data/users`, {
    method: "POST",
    body,
  });

  return NextResponse.json(
    {
      ...data,
    },
    { status },
  );
}
