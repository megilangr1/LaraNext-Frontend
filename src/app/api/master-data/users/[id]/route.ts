import { extractRequestBody } from "@/shared/helpers/extract-request-body";
import { fetchBackend } from "@/shared/helpers/server-fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const [status, data] = await fetchBackend(`/v1/master-data/users/${id}`);
  return NextResponse.json(data, { status });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { ok, body, error } = await extractRequestBody(req);
  if (!ok) return NextResponse.json(error, { status: 400 });

  const [status, data] = await fetchBackend(`/v1/master-data/users/${id}`, {
    method: "PUT",
    body,
  });

  return NextResponse.json(
    {
      ...data,
    },
    { status },
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const [status, data] = await fetchBackend(`/v1/master-data/users/${id}`, {
    method: "DELETE",
  });

  return NextResponse.json(
    {
      ...data,
    },
    { status },
  );
}
