/*
  Warnings:

  - Added the required column `localeId` to the `FixedFeast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localeId` to the `MovableFeast` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "CalendarLocale" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "scope" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FixedFeast" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "yearNumber" INTEGER NOT NULL,
    "monthNumber" INTEGER NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "description" TEXT,
    "riteVersionId" INTEGER NOT NULL,
    "localeId" INTEGER NOT NULL,
    "rankId" INTEGER NOT NULL,
    "rescheduledFromId" INTEGER,
    "rescheduledToMovableId" INTEGER,
    CONSTRAINT "FixedFeast_riteVersionId_fkey" FOREIGN KEY ("riteVersionId") REFERENCES "RiteVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FixedFeast_localeId_fkey" FOREIGN KEY ("localeId") REFERENCES "CalendarLocale" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FixedFeast_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FixedFeast_rescheduledFromId_fkey" FOREIGN KEY ("rescheduledFromId") REFERENCES "FixedFeast" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FixedFeast_rescheduledToMovableId_fkey" FOREIGN KEY ("rescheduledToMovableId") REFERENCES "MovableFeast" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_FixedFeast" ("dayNumber", "description", "id", "key", "monthNumber", "name", "rankId", "rescheduledFromId", "rescheduledToMovableId", "riteVersionId", "yearNumber") SELECT "dayNumber", "description", "id", "key", "monthNumber", "name", "rankId", "rescheduledFromId", "rescheduledToMovableId", "riteVersionId", "yearNumber" FROM "FixedFeast";
DROP TABLE "FixedFeast";
ALTER TABLE "new_FixedFeast" RENAME TO "FixedFeast";
CREATE UNIQUE INDEX "FixedFeast_key_key" ON "FixedFeast"("key");
CREATE UNIQUE INDEX "FixedFeast_key_riteVersionId_key" ON "FixedFeast"("key", "riteVersionId");
CREATE TABLE "new_MovableFeast" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "yearNumber" INTEGER NOT NULL,
    "offsetFromEaster" INTEGER NOT NULL,
    "description" TEXT,
    "riteVersionId" INTEGER NOT NULL,
    "localeId" INTEGER NOT NULL,
    "rankId" INTEGER NOT NULL,
    "rescheduledFromId" INTEGER,
    "rescheduledToFixedId" INTEGER,
    CONSTRAINT "MovableFeast_riteVersionId_fkey" FOREIGN KEY ("riteVersionId") REFERENCES "RiteVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovableFeast_localeId_fkey" FOREIGN KEY ("localeId") REFERENCES "CalendarLocale" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovableFeast_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovableFeast_rescheduledFromId_fkey" FOREIGN KEY ("rescheduledFromId") REFERENCES "MovableFeast" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "MovableFeast_rescheduledToFixedId_fkey" FOREIGN KEY ("rescheduledToFixedId") REFERENCES "FixedFeast" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MovableFeast" ("description", "id", "key", "name", "offsetFromEaster", "rankId", "rescheduledFromId", "rescheduledToFixedId", "riteVersionId", "yearNumber") SELECT "description", "id", "key", "name", "offsetFromEaster", "rankId", "rescheduledFromId", "rescheduledToFixedId", "riteVersionId", "yearNumber" FROM "MovableFeast";
DROP TABLE "MovableFeast";
ALTER TABLE "new_MovableFeast" RENAME TO "MovableFeast";
CREATE UNIQUE INDEX "MovableFeast_key_key" ON "MovableFeast"("key");
CREATE UNIQUE INDEX "MovableFeast_key_riteVersionId_key" ON "MovableFeast"("key", "riteVersionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "CalendarLocale_name_key" ON "CalendarLocale"("name");
