import { itemHandlers } from "@/lib/admin-crud";
import { prisma } from "@/lib/prisma";

export const { PUT, DELETE } = itemHandlers(prisma.product);
