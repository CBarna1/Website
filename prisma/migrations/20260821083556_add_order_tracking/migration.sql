-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderNumber" TEXT NOT NULL,
    "trackingToken" TEXT NOT NULL DEFAULT '',
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "fulfillment" TEXT NOT NULL,
    "deliveryAddress" TEXT NOT NULL DEFAULT '',
    "deliveryFee" INTEGER NOT NULL DEFAULT 0,
    "subtotal" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING_PAYMENT',
    "notes" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Order" ("createdAt", "customerEmail", "customerName", "customerPhone", "deliveryAddress", "deliveryFee", "fulfillment", "id", "notes", "orderNumber", "status", "subtotal", "total", "updatedAt") SELECT "createdAt", "customerEmail", "customerName", "customerPhone", "deliveryAddress", "deliveryFee", "fulfillment", "id", "notes", "orderNumber", "status", "subtotal", "total", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
UPDATE "Order" SET "trackingToken" = lower(hex(randomblob(16))) WHERE "trackingToken" = '';
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");
CREATE UNIQUE INDEX "Order_trackingToken_key" ON "Order"("trackingToken");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
