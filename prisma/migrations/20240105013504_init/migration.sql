-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Spread" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "description" TEXT,
    "note" TEXT,
    "photo" TEXT,
    "audio" TEXT,
    CONSTRAINT "Spread_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "spreadId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "card" TEXT,
    "suit" TEXT,
    "note" TEXT,
    CONSTRAINT "Position_spreadId_fkey" FOREIGN KEY ("spreadId") REFERENCES "Spread" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
