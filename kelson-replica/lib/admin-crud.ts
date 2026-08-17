import { NextResponse } from "next/server";
import { getSession, type SessionPayload } from "@/lib/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyDelegate = {
  findMany: (args?: any) => Promise<any[]>;
  create: (args: any) => Promise<any>;
  update: (args: any) => Promise<any>;
  delete: (args: any) => Promise<any>;
};

export async function requireSession(role?: "ADMIN"): Promise<SessionPayload | null> {
  const session = await getSession();
  if (!session) return null;
  if (role && session.role !== role) return null;
  return session;
}

export function listCreateHandlers(delegate: AnyDelegate, orderBy: unknown = { order: "asc" }) {
  return {
    async GET() {
      const session = await requireSession();
      if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      const items = await delegate.findMany({ orderBy });
      return NextResponse.json(items);
    },
    async POST(request: Request) {
      const session = await requireSession();
      if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      const data = await request.json().catch(() => null);
      if (!data) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
      const item = await delegate.create({ data });
      return NextResponse.json(item, { status: 201 });
    },
  };
}

export function itemHandlers(delegate: AnyDelegate) {
  return {
    async PUT(request: Request, context: { params: Promise<{ id: string }> }) {
      const session = await requireSession();
      if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      const { id } = await context.params;
      const data = await request.json().catch(() => null);
      if (!data) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
      const item = await delegate.update({ where: { id }, data });
      return NextResponse.json(item);
    },
    async DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
      const session = await requireSession();
      if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      const { id } = await context.params;
      await delegate.delete({ where: { id } });
      return NextResponse.json({ ok: true });
    },
  };
}

