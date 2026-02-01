/*
  Warnings:

  - You are about to drop the column `externalId` on the `WorkItem` table. All the data in the column will be lost.
  - You are about to drop the column `importedAt` on the `WorkItem` table. All the data in the column will be lost.
  - You are about to drop the column `resolvedAt` on the `WorkItem` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `WorkItem` table. All the data in the column will be lost.
  - Added the required column `project` to the `WorkItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `WorkItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WorkItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "project" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "activatedAt" DATETIME,
    "closedAt" DATETIME
);
INSERT INTO "new_WorkItem" ("activatedAt", "closedAt", "createdAt", "id", "title", "type") SELECT "activatedAt", "closedAt", "createdAt", "id", "title", "type" FROM "WorkItem";
DROP TABLE "WorkItem";
ALTER TABLE "new_WorkItem" RENAME TO "WorkItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
