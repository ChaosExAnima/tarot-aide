/*
  Warnings:

  - You are about to drop the column `description` on the `Spread` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Position` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Spread" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "template" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Spread_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Spread" ("createdAt", "date", "id", "name", "notes", "template", "userId") SELECT "createdAt", "date", "id", "name", "notes", "template", "userId" FROM "Spread";
DROP TABLE "Spread";
ALTER TABLE "new_Spread" RENAME TO "Spread";
CREATE INDEX "Spread_userId_template_idx" ON "Spread"("userId", "template");
CREATE TABLE "new_Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "spreadId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "card" TEXT,
    "reversed" BOOLEAN NOT NULL DEFAULT false,
    "suit" TEXT,
    "notes" TEXT,
    CONSTRAINT "Position_spreadId_fkey" FOREIGN KEY ("spreadId") REFERENCES "Spread" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Position" ("card", "id", "name", "notes", "reversed", "spreadId", "suit") SELECT "card", "id", "name", "notes", "reversed", "spreadId", "suit" FROM "Position";
DROP TABLE "Position";
ALTER TABLE "new_Position" RENAME TO "Position";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
