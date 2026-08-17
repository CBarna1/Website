import { prisma } from "@/lib/prisma";
import { itemHandlers } from "@/lib/admin-crud";

export const { DELETE } = itemHandlers(prisma.contactSubmission);
