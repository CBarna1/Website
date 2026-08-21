import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { getPdfPageCount } from "@/lib/pdf";
import { getClientKey, rateLimit } from "@/lib/rate-limit";

const allowedTypes = new Map([["application/pdf", ".pdf"]]);

const maxSize = 20 * 1024 * 1024;

export async function POST(request: Request) {
  const limit = rateLimit(`print-upload:${getClientKey(request)}`, 10, 60 * 60 * 1000);
  if (!limit.allowed) return NextResponse.json({ error: "Upload limit reached. Please try again later." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose a document first." }, { status: 400 });
  }

  const extension = allowedTypes.get(file.type);
  if (!extension) {
    return NextResponse.json({ error: "Print documents must be PDF files." }, { status: 400 });
  }
  if (file.size === 0 || file.size > maxSize) {
    return NextResponse.json({ error: "Documents must be between 1 byte and 20 MB." }, { status: 400 });
  }

  const fileBytes = new Uint8Array(await file.arrayBuffer());
  const signature = new TextDecoder().decode(fileBytes.slice(0, 5));
  if (signature !== "%PDF-") {
    return NextResponse.json({ error: "The uploaded file is not a valid PDF document." }, { status: 400 });
  }

  let pageCount: number;
  try {
    pageCount = await getPdfPageCount(fileBytes);
  } catch {
    return NextResponse.json({ error: "The PDF page count could not be read." }, { status: 400 });
  }

  const filename = `${randomUUID()}${extension}`;
  const directory = path.join(process.cwd(), "storage", "print-orders");
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, filename), Buffer.from(fileBytes), { flag: "wx" });

  return NextResponse.json({ filePath: `print-orders/${filename}`, pageCount }, { status: 201 });
}
