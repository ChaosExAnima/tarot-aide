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
    "photo" TEXT,
    "audio" TEXT,
    "template" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Spread_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Spread" ("audio", "createdAt", "date", "description", "id", "name", "note", "photo", "userId") SELECT "audio", "createdAt", "date", "description", "id", "name", "note", "photo", "userId" FROM "Spread";
DROP TABLE "Spread";
ALTER TABLE "new_Spread" RENAME TO "Spread";
CREATE INDEX "Spread_userId_template_idx" ON "Spread"("userId", "template");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
