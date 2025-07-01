/*
  Warnings:

  - You are about to alter the column `newValue` on the `Adjustment` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `oldValue` on the `Adjustment` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `currentValue` on the `RentalContract` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `initialValue` on the `RentalContract` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `amountDue` on the `RentalPayment` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `amountPaid` on the `RentalPayment` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Adjustment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rentalContractId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "oldValue" INTEGER NOT NULL,
    "newValue" INTEGER NOT NULL,
    "reason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Adjustment_rentalContractId_fkey" FOREIGN KEY ("rentalContractId") REFERENCES "RentalContract" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Adjustment" ("createdAt", "date", "id", "newValue", "oldValue", "reason", "rentalContractId") SELECT "createdAt", "date", "id", "newValue", "oldValue", "reason", "rentalContractId" FROM "Adjustment";
DROP TABLE "Adjustment";
ALTER TABLE "new_Adjustment" RENAME TO "Adjustment";
CREATE TABLE "new_RentalContract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "initialValue" INTEGER NOT NULL,
    "currentValue" INTEGER NOT NULL,
    "lastAdjustmentAt" DATETIME,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "renewedFromId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RentalContract_renewedFromId_fkey" FOREIGN KEY ("renewedFromId") REFERENCES "RentalContract" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "RentalContract_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RentalContract_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RentalContract" ("createdAt", "currentValue", "endDate", "id", "initialValue", "isActive", "lastAdjustmentAt", "notes", "renewedFromId", "startDate", "tenantId", "updatedAt", "warehouseId") SELECT "createdAt", "currentValue", "endDate", "id", "initialValue", "isActive", "lastAdjustmentAt", "notes", "renewedFromId", "startDate", "tenantId", "updatedAt", "warehouseId" FROM "RentalContract";
DROP TABLE "RentalContract";
ALTER TABLE "new_RentalContract" RENAME TO "RentalContract";
CREATE TABLE "new_RentalPayment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rentalContractId" TEXT NOT NULL,
    "month" DATETIME NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "paidDate" DATETIME,
    "amountDue" INTEGER NOT NULL,
    "amountPaid" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RentalPayment_rentalContractId_fkey" FOREIGN KEY ("rentalContractId") REFERENCES "RentalContract" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RentalPayment" ("amountDue", "amountPaid", "createdAt", "dueDate", "id", "month", "notes", "paidDate", "rentalContractId", "status") SELECT "amountDue", "amountPaid", "createdAt", "dueDate", "id", "month", "notes", "paidDate", "rentalContractId", "status" FROM "RentalPayment";
DROP TABLE "RentalPayment";
ALTER TABLE "new_RentalPayment" RENAME TO "RentalPayment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
