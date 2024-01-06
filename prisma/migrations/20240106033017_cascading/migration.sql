-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Media" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "path" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "spreadId" INTEGER,
    "userId" INTEGER,
    CONSTRAINT "Media_spreadId_fkey" FOREIGN KEY ("spreadId") REFERENCES "Spread" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Media" ("createdAt", "height", "path", "spreadId", "type", "userId", "width") SELECT "createdAt", "height", "path", "spreadId", "type", "userId", "width" FROM "Media";
DROP TABLE "Media";
ALTER TABLE "new_Media" RENAME TO "Media";
CREATE INDEX "Media_spreadId_idx" ON "Media"("spreadId");
CREATE TABLE "new_Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "spreadId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "card" TEXT,
    "suit" TEXT,
    "note" TEXT,
    CONSTRAINT "Position_spreadId_fkey" FOREIGN KEY ("spreadId") REFERENCES "Spread" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Position" ("card", "description", "id", "name", "note", "spreadId", "suit") SELECT "card", "description", "id", "name", "note", "spreadId", "suit" FROM "Position";
DROP TABLE "Position";
ALTER TABLE "new_Position" RENAME TO "Position";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
