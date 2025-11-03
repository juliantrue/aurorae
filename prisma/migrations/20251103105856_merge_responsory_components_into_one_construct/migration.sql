/*
  Warnings:

  - You are about to drop the `Benediction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Responsory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResponsoryPart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Versicle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `benedictionId` on the `GabcSource` table. All the data in the column will be lost.
  - You are about to drop the column `responsoryPartId` on the `GabcSource` table. All the data in the column will be lost.
  - You are about to drop the column `versicleId` on the `GabcSource` table. All the data in the column will be lost.
  - You are about to drop the column `riteId` on the `OratioCommunis` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Responsory_key_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Benediction";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Responsory";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ResponsoryPart";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Versicle";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ResponseSequence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "kind" TEXT NOT NULL DEFAULT 'Other'
);

-- CreateTable
CREATE TABLE "ResponsePart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "responseSequenceId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "label" TEXT,
    "text" TEXT NOT NULL,
    CONSTRAINT "ResponsePart_responseSequenceId_fkey" FOREIGN KEY ("responseSequenceId") REFERENCES "ResponseSequence" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GabcSource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "gabc" TEXT NOT NULL,
    "chantSourceId" INTEGER NOT NULL,
    "chantUsageId" INTEGER NOT NULL,
    "antiphonId" INTEGER,
    "hymnId" INTEGER,
    "responsePartId" INTEGER,
    CONSTRAINT "GabcSource_chantSourceId_fkey" FOREIGN KEY ("chantSourceId") REFERENCES "ChantSource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_chantUsageId_fkey" FOREIGN KEY ("chantUsageId") REFERENCES "ChantUsage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_antiphonId_fkey" FOREIGN KEY ("antiphonId") REFERENCES "Antiphon" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_hymnId_fkey" FOREIGN KEY ("hymnId") REFERENCES "Hymn" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_responsePartId_fkey" FOREIGN KEY ("responsePartId") REFERENCES "ResponsePart" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GabcSource" ("antiphonId", "chantSourceId", "chantUsageId", "gabc", "hymnId", "id", "mode", "name") SELECT "antiphonId", "chantSourceId", "chantUsageId", "gabc", "hymnId", "id", "mode", "name" FROM "GabcSource";
DROP TABLE "GabcSource";
ALTER TABLE "new_GabcSource" RENAME TO "GabcSource";
CREATE INDEX "GabcSource_chantSourceId_idx" ON "GabcSource"("chantSourceId");
CREATE INDEX "GabcSource_chantUsageId_idx" ON "GabcSource"("chantUsageId");
CREATE TABLE "new_OratioCommunis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "text" TEXT NOT NULL
);
INSERT INTO "new_OratioCommunis" ("id", "key", "text") SELECT "id", "key", "text" FROM "OratioCommunis";
DROP TABLE "OratioCommunis";
ALTER TABLE "new_OratioCommunis" RENAME TO "OratioCommunis";
CREATE UNIQUE INDEX "OratioCommunis_key_key" ON "OratioCommunis"("key");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
