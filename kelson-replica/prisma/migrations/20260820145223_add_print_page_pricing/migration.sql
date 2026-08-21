-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PrintOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "pageCount" INTEGER NOT NULL DEFAULT 1,
    "pagesToPrint" INTEGER NOT NULL DEFAULT 1,
    "printCost" INTEGER NOT NULL DEFAULT 10,
    "paperSize" TEXT NOT NULL,
    "colorMode" TEXT NOT NULL,
    "copies" INTEGER NOT NULL,
    "sides" TEXT NOT NULL,
    "paperType" TEXT NOT NULL,
    "finishing" TEXT NOT NULL,
    "instructions" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "PrintOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PrintOrder" ("colorMode", "copies", "fileName", "filePath", "finishing", "id", "instructions", "orderId", "paperSize", "paperType", "sides") SELECT "colorMode", "copies", "fileName", "filePath", "finishing", "id", "instructions", "orderId", "paperSize", "paperType", "sides" FROM "PrintOrder";
DROP TABLE "PrintOrder";
ALTER TABLE "new_PrintOrder" RENAME TO "PrintOrder";
CREATE UNIQUE INDEX "PrintOrder_orderId_key" ON "PrintOrder"("orderId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
