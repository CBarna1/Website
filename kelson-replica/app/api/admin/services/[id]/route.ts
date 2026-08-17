import { prisma } from "@/lib/prisma";
import { itemHandlers } from "@/lib/admin-crud";

export const { PUT, DELETE } = itemHandlers(prisma.service);
