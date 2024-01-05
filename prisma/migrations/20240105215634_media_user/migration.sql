/*
  Warnings:

  - Added the required column `userId` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Media" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "path" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "spreadId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Media_spreadId_fkey" FOREIGN KEY ("spreadId") REFERENCES "Spread" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Media" ("createdAt", "height", "path", "spreadId", "type", "width") SELECT "createdAt", "height", "path", "spreadId", "type", "width" FROM "Media";
DROP TABLE "Media";
ALTER TABLE "new_Media" RENAME TO "Media";
CREATE INDEX "Media_spreadId_idx" ON "Media"("spreadId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
