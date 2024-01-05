/*
  Warnings:

  - You are about to drop the column `audio` on the `Spread` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Spread` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Media" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "path" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "spreadId" INTEGER NOT NULL,
    CONSTRAINT "Media_spreadId_fkey" FOREIGN KEY ("spreadId") REFERENCES "Spread" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Spread" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "description" TEXT,
    "note" TEXT,
    "template" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Spread_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Spread" ("createdAt", "date", "description", "id", "name", "note", "template", "userId") SELECT "createdAt", "date", "description", "id", "name", "note", "template", "userId" FROM "Spread";
DROP TABLE "Spread";
ALTER TABLE "new_Spread" RENAME TO "Spread";
CREATE INDEX "Spread_userId_template_idx" ON "Spread"("userId", "template");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE INDEX "Media_spreadId_idx" ON "Media"("spreadId");
