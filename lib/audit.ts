import { prisma } from "@/lib/prisma";
import type { SessionPayload } from "@/lib/auth";

function snapshot(value: unknown) {
  if (value === undefined || value === null) return null;
  return JSON.stringify(value);
}

export async function recordAudit({
  session,
  action,
  entity,
  entityId,
  before,
  after,
  request,
}: {
  session: SessionPayload;
  action: string;
  entity: string;
  entityId?: string;
  before?: unknown;
  after?: unknown;
  request?: Request;
}) {
  await prisma.auditLog.create({
    data: {
      actorId: session.sub,
      actorName: session.name,
      actorEmail: session.email,
      action,
      entity,
      entityId,
      beforeData: snapshot(before),
      afterData: snapshot(after),
      ipAddress: request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? request?.headers.get("x-real-ip"),
      userAgent: request?.headers.get("user-agent"),
    },
  });
}
