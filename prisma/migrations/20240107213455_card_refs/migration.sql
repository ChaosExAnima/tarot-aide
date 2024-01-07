/*
  Warnings:

  - You are about to drop the column `card` on the `Position` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "suit" TEXT
);

-- CreateTable
CREATE TABLE "CardReference" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "source" TEXT,
    "reverse" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "CardReference_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "spreadId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cardId" INTEGER,
    "suit" TEXT,
    "note" TEXT,
    CONSTRAINT "Position_spreadId_fkey" FOREIGN KEY ("spreadId") REFERENCES "Spread" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Position_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Position" ("description", "id", "name", "note", "spreadId", "suit") SELECT "description", "id", "name", "note", "spreadId", "suit" FROM "Position";
DROP TABLE "Position";
ALTER TABLE "new_Position" RENAME TO "Position";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE INDEX "Card_suit_idx" ON "Card"("suit");

-- CreateIndex
CREATE INDEX "CardReference_cardId_reverse_idx" ON "CardReference"("cardId", "reverse");
