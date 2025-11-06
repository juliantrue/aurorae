/*
  Warnings:

  - You are about to drop the column `source` on the `Canticle` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Responsory` table. All the data in the column will be lost.
  - Made the column `text` on table `Antiphon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `text` on table `Collect` required. This step will fail if there are existing NULL values in that column.
  - Made the column `text` on table `Hymn` required. This step will fail if there are existing NULL values in that column.
  - Made the column `incipit` on table `Psalm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `number` on table `Psalm` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `key` to the `Responsory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ChantSource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "editor" TEXT,
    "publisher" TEXT
);

-- CreateTable
CREATE TABLE "ChantUsage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GabcSource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "gabc" TEXT NOT NULL,
    "chantSourceId" INTEGER NOT NULL,
    "chantUsageId" INTEGER NOT NULL,
    "antiphonId" INTEGER,
    "hymnId" INTEGER,
    "benedictionId" INTEGER,
    "versicleId" INTEGER,
    "responsoryPartId" INTEGER,
    CONSTRAINT "GabcSource_chantSourceId_fkey" FOREIGN KEY ("chantSourceId") REFERENCES "ChantSource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_chantUsageId_fkey" FOREIGN KEY ("chantUsageId") REFERENCES "ChantUsage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_antiphonId_fkey" FOREIGN KEY ("antiphonId") REFERENCES "Antiphon" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_hymnId_fkey" FOREIGN KEY ("hymnId") REFERENCES "Hymn" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_benedictionId_fkey" FOREIGN KEY ("benedictionId") REFERENCES "Benediction" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_versicleId_fkey" FOREIGN KEY ("versicleId") REFERENCES "Versicle" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_responsoryPartId_fkey" FOREIGN KEY ("responsoryPartId") REFERENCES "ResponsoryPart" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ResponsoryPart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "responsoryId" INTEGER NOT NULL,
    CONSTRAINT "ResponsoryPart_responsoryId_fkey" FOREIGN KEY ("responsoryId") REFERENCES "Responsory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Antiphon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "incipit" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "tone" TEXT
);
INSERT INTO "new_Antiphon" ("id", "incipit", "text") SELECT "id", "incipit", "text" FROM "Antiphon";
DROP TABLE "Antiphon";
ALTER TABLE "new_Antiphon" RENAME TO "Antiphon";
CREATE TABLE "new_Canticle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "seqStart" INTEGER NOT NULL,
    "seqEnd" INTEGER NOT NULL,
    "textSourceId" INTEGER NOT NULL,
    "startUnitId" INTEGER NOT NULL,
    "endUnitId" INTEGER NOT NULL,
    CONSTRAINT "Canticle_textSourceId_fkey" FOREIGN KEY ("textSourceId") REFERENCES "TextSource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Canticle_startUnitId_fkey" FOREIGN KEY ("startUnitId") REFERENCES "TextUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Canticle_endUnitId_fkey" FOREIGN KEY ("endUnitId") REFERENCES "TextUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Canticle" ("endUnitId", "id", "key", "seqEnd", "seqStart", "startUnitId", "textSourceId") SELECT "endUnitId", "id", "key", "seqEnd", "seqStart", "startUnitId", "textSourceId" FROM "Canticle";
DROP TABLE "Canticle";
ALTER TABLE "new_Canticle" RENAME TO "Canticle";
CREATE TABLE "new_Collect" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "incipit" TEXT NOT NULL,
    "text" TEXT NOT NULL
);
INSERT INTO "new_Collect" ("id", "incipit", "text") SELECT "id", "incipit", "text" FROM "Collect";
DROP TABLE "Collect";
ALTER TABLE "new_Collect" RENAME TO "Collect";
CREATE TABLE "new_Hymn" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL
);
INSERT INTO "new_Hymn" ("id", "text", "title") SELECT "id", "text", "title" FROM "Hymn";
DROP TABLE "Hymn";
ALTER TABLE "new_Hymn" RENAME TO "Hymn";
CREATE TABLE "new_Psalm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER NOT NULL,
    "incipit" TEXT NOT NULL,
    "seqStart" INTEGER NOT NULL,
    "seqEnd" INTEGER NOT NULL,
    "textSourceId" INTEGER NOT NULL,
    "startUnitId" INTEGER NOT NULL,
    "endUnitId" INTEGER NOT NULL,
    CONSTRAINT "Psalm_textSourceId_fkey" FOREIGN KEY ("textSourceId") REFERENCES "TextSource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Psalm_startUnitId_fkey" FOREIGN KEY ("startUnitId") REFERENCES "TextUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Psalm_endUnitId_fkey" FOREIGN KEY ("endUnitId") REFERENCES "TextUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Psalm" ("endUnitId", "id", "incipit", "number", "seqEnd", "seqStart", "startUnitId", "textSourceId") SELECT "endUnitId", "id", "incipit", "number", "seqEnd", "seqStart", "startUnitId", "textSourceId" FROM "Psalm";
DROP TABLE "Psalm";
ALTER TABLE "new_Psalm" RENAME TO "Psalm";
CREATE TABLE "new_Responsory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "incipit" TEXT NOT NULL
);
INSERT INTO "new_Responsory" ("id", "incipit") SELECT "id", "incipit" FROM "Responsory";
DROP TABLE "Responsory";
ALTER TABLE "new_Responsory" RENAME TO "Responsory";
CREATE UNIQUE INDEX "Responsory_key_key" ON "Responsory"("key");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "ChantSource_code_key" ON "ChantSource"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ChantUsage_key_key" ON "ChantUsage"("key");

-- CreateIndex
CREATE INDEX "GabcSource_chantSourceId_idx" ON "GabcSource"("chantSourceId");

-- CreateIndex
CREATE INDEX "GabcSource_chantUsageId_idx" ON "GabcSource"("chantUsageId");
