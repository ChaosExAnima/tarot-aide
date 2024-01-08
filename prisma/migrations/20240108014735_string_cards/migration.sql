/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `cardId` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `cardId` on the `CardReference` table. All the data in the column will be lost.
  - Added the required column `card` to the `CardReference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `CardReference` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Card_suit_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Card";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "spreadId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "card" TEXT,
    "suit" TEXT,
    "notes" TEXT,
    CONSTRAINT "Position_spreadId_fkey" FOREIGN KEY ("spreadId") REFERENCES "Spread" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Position" ("description", "id", "name", "notes", "spreadId", "suit") SELECT "description", "id", "name", "notes", "spreadId", "suit" FROM "Position";
DROP TABLE "Position";
ALTER TABLE "new_Position" RENAME TO "Position";
CREATE TABLE "new_CardReference" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "card" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "source" TEXT,
    "keywords" TEXT,
    "reversed" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "CardReference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CardReference" ("createdAt", "id", "keywords", "reversed", "source", "text") SELECT "createdAt", "id", "keywords", "reversed", "source", "text" FROM "CardReference";
DROP TABLE "CardReference";
ALTER TABLE "new_CardReference" RENAME TO "CardReference";
CREATE INDEX "CardReference_card_reversed_idx" ON "CardReference"("card", "reversed");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
