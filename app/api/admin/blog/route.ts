import { prisma } from "@/lib/prisma";
import { listCreateHandlers } from "@/lib/admin-crud";

export const { GET, POST } = listCreateHandlers(prisma.blogPost);
