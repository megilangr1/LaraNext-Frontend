import { extractRequestBody } from "@/shared/helpers/extract-request-body";
import { fetchBackend } from "@/shared/helpers/server-fetcher";
import { NextRequest, NextResponse } from "next/server";
import QueryString from "qs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const parsed = QueryString.parse(searchParams.toString(), {
    ignoreQueryPrefix: true,
  });

  const finalParams = new URLSearchParams();

  if (parsed.search) finalParams.set("search", parsed.search as string);
  if (parsed.sortBy) finalParams.set("sortBy", parsed.sortBy as string);
  if (parsed.sortType)
    finalParams.set("sortType", parsed.sortType === "desc" ? "desc" : "asc");
  if (parsed.limit) finalParams.set("limit", String(parsed.limit));
  if (parsed.page) finalParams.set("page", String(parsed.page));

  const [status, data] = await fetchBackend(
    `/v1/master-data/kelurahan?${finalParams.toString()}`,
  );

  return NextResponse.json(data, { status });
}

export async function POST(req: NextRequest) {
  const { ok, body, error } = await extractRequestBody(req);
  if (!ok) return NextResponse.json(error, { status: 400 });

  const [status, data] = await fetchBackend(`/v1/master-data/kelurahan`, {
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
