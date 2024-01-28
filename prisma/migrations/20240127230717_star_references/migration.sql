-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CardReference" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "card" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "source" TEXT,
    "keywords" TEXT,
    "reversed" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "CardReference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CardReference" ("card", "createdAt", "id", "keywords", "reversed", "source", "text", "userId") SELECT "card", "createdAt", "id", "keywords", "reversed", "source", "text", "userId" FROM "CardReference";
DROP TABLE "CardReference";
ALTER TABLE "new_CardReference" RENAME TO "CardReference";
CREATE INDEX "CardReference_userId_card_idx" ON "CardReference"("userId", "card");
CREATE INDEX "CardReference_userId_source_idx" ON "CardReference"("userId", "source");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
