/*
  Warnings:

  - You are about to drop the column `day` on the `FixedFeast` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `FixedFeast` table. All the data in the column will be lost.
  - You are about to drop the column `latinName` on the `Rank` table. All the data in the column will be lost.
  - You are about to drop the column `vernacular` on the `Rank` table. All the data in the column will be lost.
  - You are about to drop the column `latinName` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the column `vernacular` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the column `weekday` on the `SeasonalDay` table. All the data in the column will be lost.
  - Added the required column `dayNumber` to the `FixedFeast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthNumber` to the `FixedFeast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearNumber` to the `FixedFeast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearNumber` to the `MovableFeast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Rank` table without a default value. This is not possible if the table is not empty.
  - Made the column `precedence` on table `Rank` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `Season` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayNumber` to the `SeasonalDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearNumber` to the `SeasonalDay` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "OnConflictTransferDefinition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transferKind" TEXT NOT NULL,
    "offsetFromEaster" INTEGER,
    "fixedYear" INTEGER,
    "fixedMonth" INTEGER,
    "fixedDay" INTEGER
);

-- CreateTable
CREATE TABLE "ConflictResolutionRule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "onConflict" TEXT NOT NULL,
    "notes" TEXT,
    "condition" TEXT,
    "transferTo" TEXT,
    "riteVersionId" INTEGER NOT NULL,
    "rankId" INTEGER,
    "movableFeastId" INTEGER,
    "fixedFeastId" INTEGER,
    CONSTRAINT "ConflictResolutionRule_riteVersionId_fkey" FOREIGN KEY ("riteVersionId") REFERENCES "RiteVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ConflictResolutionRule_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ConflictResolutionRule_movableFeastId_fkey" FOREIGN KEY ("movableFeastId") REFERENCES "MovableFeast" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ConflictResolutionRule_fixedFeastId_fkey" FOREIGN KEY ("fixedFeastId") REFERENCES "FixedFeast" ("id") ON DELETE SET NULL ON UPDATE CASCADE
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
    "rankId" INTEGER NOT NULL,
    "rescheduledFromId" INTEGER,
    "rescheduledToMovableId" INTEGER,
    CONSTRAINT "FixedFeast_riteVersionId_fkey" FOREIGN KEY ("riteVersionId") REFERENCES "RiteVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FixedFeast_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FixedFeast_rescheduledFromId_fkey" FOREIGN KEY ("rescheduledFromId") REFERENCES "FixedFeast" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FixedFeast_rescheduledToMovableId_fkey" FOREIGN KEY ("rescheduledToMovableId") REFERENCES "MovableFeast" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_FixedFeast" ("description", "id", "key", "name", "rankId", "riteVersionId") SELECT "description", "id", "key", "name", "rankId", "riteVersionId" FROM "FixedFeast";
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
    "rankId" INTEGER NOT NULL,
    "rescheduledFromId" INTEGER,
    "rescheduledToFixedId" INTEGER,
    CONSTRAINT "MovableFeast_riteVersionId_fkey" FOREIGN KEY ("riteVersionId") REFERENCES "RiteVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovableFeast_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovableFeast_rescheduledFromId_fkey" FOREIGN KEY ("rescheduledFromId") REFERENCES "MovableFeast" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "MovableFeast_rescheduledToFixedId_fkey" FOREIGN KEY ("rescheduledToFixedId") REFERENCES "FixedFeast" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MovableFeast" ("description", "id", "key", "name", "offsetFromEaster", "rankId", "riteVersionId") SELECT "description", "id", "key", "name", "offsetFromEaster", "rankId", "riteVersionId" FROM "MovableFeast";
DROP TABLE "MovableFeast";
ALTER TABLE "new_MovableFeast" RENAME TO "MovableFeast";
CREATE UNIQUE INDEX "MovableFeast_key_key" ON "MovableFeast"("key");
CREATE UNIQUE INDEX "MovableFeast_key_riteVersionId_key" ON "MovableFeast"("key", "riteVersionId");
CREATE TABLE "new_Rank" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "precedence" INTEGER NOT NULL,
    "description" TEXT,
    "riteVersionId" INTEGER NOT NULL,
    CONSTRAINT "Rank_riteVersionId_fkey" FOREIGN KEY ("riteVersionId") REFERENCES "RiteVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rank" ("description", "id", "key", "precedence", "riteVersionId") SELECT "description", "id", "key", "precedence", "riteVersionId" FROM "Rank";
DROP TABLE "Rank";
ALTER TABLE "new_Rank" RENAME TO "Rank";
CREATE UNIQUE INDEX "Rank_key_riteVersionId_key" ON "Rank"("key", "riteVersionId");
CREATE TABLE "new_ResponseSequence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "kind" TEXT NOT NULL DEFAULT 'OTHER'
);
INSERT INTO "new_ResponseSequence" ("description", "id", "kind", "title") SELECT "description", "id", "kind", "title" FROM "ResponseSequence";
DROP TABLE "ResponseSequence";
ALTER TABLE "new_ResponseSequence" RENAME TO "ResponseSequence";
CREATE TABLE "new_Season" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "description" TEXT,
    "riteVersionId" INTEGER NOT NULL,
    CONSTRAINT "Season_riteVersionId_fkey" FOREIGN KEY ("riteVersionId") REFERENCES "RiteVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Season" ("color", "description", "id", "key", "riteVersionId") SELECT "color", "description", "id", "key", "riteVersionId" FROM "Season";
DROP TABLE "Season";
ALTER TABLE "new_Season" RENAME TO "Season";
CREATE UNIQUE INDEX "Season_key_riteVersionId_key" ON "Season"("key", "riteVersionId");
CREATE TABLE "new_SeasonalDay" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "yearNumber" INTEGER NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "description" TEXT,
    "riteVersionId" INTEGER NOT NULL,
    "rankId" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,
    CONSTRAINT "SeasonalDay_riteVersionId_fkey" FOREIGN KEY ("riteVersionId") REFERENCES "RiteVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SeasonalDay_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SeasonalDay_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SeasonalDay" ("description", "id", "key", "rankId", "riteVersionId", "seasonId", "weekNumber") SELECT "description", "id", "key", "rankId", "riteVersionId", "seasonId", "weekNumber" FROM "SeasonalDay";
DROP TABLE "SeasonalDay";
ALTER TABLE "new_SeasonalDay" RENAME TO "SeasonalDay";
CREATE UNIQUE INDEX "SeasonalDay_key_key" ON "SeasonalDay"("key");
CREATE UNIQUE INDEX "SeasonalDay_key_riteVersionId_key" ON "SeasonalDay"("key", "riteVersionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
