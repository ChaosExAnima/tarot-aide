/*
  Warnings:

  - You are about to drop the column `note` on the `Spread` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `reverse` on the `CardReference` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Spread" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "notes" TEXT,
    "template" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Spread_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Spread" ("createdAt", "date", "description", "id", "name", "template", "userId") SELECT "createdAt", "date", "description", "id", "name", "template", "userId" FROM "Spread";
DROP TABLE "Spread";
ALTER TABLE "new_Spread" RENAME TO "Spread";
CREATE INDEX "Spread_userId_template_idx" ON "Spread"("userId", "template");
CREATE TABLE "new_Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "spreadId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cardId" INTEGER,
    "suit" TEXT,
    "notes" TEXT,
    CONSTRAINT "Position_spreadId_fkey" FOREIGN KEY ("spreadId") REFERENCES "Spread" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Position_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Position" ("cardId", "description", "id", "name", "spreadId", "suit") SELECT "cardId", "description", "id", "name", "spreadId", "suit" FROM "Position";
DROP TABLE "Position";
ALTER TABLE "new_Position" RENAME TO "Position";
CREATE TABLE "new_CardReference" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "source" TEXT,
    "reversed" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "CardReference_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CardReference" ("cardId", "createdAt", "id", "source", "text") SELECT "cardId", "createdAt", "id", "source", "text" FROM "CardReference";
DROP TABLE "CardReference";
ALTER TABLE "new_CardReference" RENAME TO "CardReference";
CREATE INDEX "CardReference_cardId_reversed_idx" ON "CardReference"("cardId", "reversed");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
