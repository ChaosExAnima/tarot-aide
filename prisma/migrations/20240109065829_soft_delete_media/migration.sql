-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Media" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "path" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "spreadId" INTEGER,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER,
    CONSTRAINT "Media_spreadId_fkey" FOREIGN KEY ("spreadId") REFERENCES "Spread" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Media" ("createdAt", "height", "path", "spreadId", "type", "userId", "width") SELECT "createdAt", "height", "path", "spreadId", "type", "userId", "width" FROM "Media";
DROP TABLE "Media";
ALTER TABLE "new_Media" RENAME TO "Media";
CREATE INDEX "Media_spreadId_deleted_idx" ON "Media"("spreadId", "deleted");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
