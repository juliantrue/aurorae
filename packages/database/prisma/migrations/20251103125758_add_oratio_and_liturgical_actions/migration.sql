/*
  Warnings:

  - You are about to drop the `Collect` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OratioCommunis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rubric` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `key` on the `Hora` table. All the data in the column will be lost.
  - You are about to drop the column `latinName` on the `Hora` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `HoraElement` table. All the data in the column will be lost.
  - Added the required column `name` to the `Hora` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "OratioCommunis_key_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Collect";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OratioCommunis";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Rubric";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ActusLiturgicus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "gestureId" INTEGER,
    "actorId" INTEGER,
    "postureId" INTEGER,
    "positionId" INTEGER,
    CONSTRAINT "ActusLiturgicus_gestureId_fkey" FOREIGN KEY ("gestureId") REFERENCES "Gesture" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ActusLiturgicus_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ActusLiturgicus_postureId_fkey" FOREIGN KEY ("postureId") REFERENCES "Posture" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ActusLiturgicus_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Gesture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Posture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Oratio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "genusId" INTEGER NOT NULL,
    CONSTRAINT "Oratio_genusId_fkey" FOREIGN KEY ("genusId") REFERENCES "OratioGenus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OratioGenus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
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
    "oratioId" INTEGER,
    CONSTRAINT "GabcSource_chantSourceId_fkey" FOREIGN KEY ("chantSourceId") REFERENCES "ChantSource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_chantUsageId_fkey" FOREIGN KEY ("chantUsageId") REFERENCES "ChantUsage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_antiphonId_fkey" FOREIGN KEY ("antiphonId") REFERENCES "Antiphon" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_hymnId_fkey" FOREIGN KEY ("hymnId") REFERENCES "Hymn" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_responsePartId_fkey" FOREIGN KEY ("responsePartId") REFERENCES "ResponsePart" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_oratioId_fkey" FOREIGN KEY ("oratioId") REFERENCES "Oratio" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GabcSource" ("antiphonId", "chantSourceId", "chantUsageId", "gabc", "hymnId", "id", "mode", "name", "responsePartId") SELECT "antiphonId", "chantSourceId", "chantUsageId", "gabc", "hymnId", "id", "mode", "name", "responsePartId" FROM "GabcSource";
DROP TABLE "GabcSource";
ALTER TABLE "new_GabcSource" RENAME TO "GabcSource";
CREATE INDEX "GabcSource_chantSourceId_idx" ON "GabcSource"("chantSourceId");
CREATE INDEX "GabcSource_chantUsageId_idx" ON "GabcSource"("chantUsageId");
CREATE TABLE "new_Hora" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "fixedFeastId" INTEGER,
    "movableFeastId" INTEGER,
    "seasonalDayId" INTEGER,
    CONSTRAINT "Hora_fixedFeastId_fkey" FOREIGN KEY ("fixedFeastId") REFERENCES "FixedFeast" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Hora_movableFeastId_fkey" FOREIGN KEY ("movableFeastId") REFERENCES "MovableFeast" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Hora_seasonalDayId_fkey" FOREIGN KEY ("seasonalDayId") REFERENCES "SeasonalDay" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Hora" ("description", "fixedFeastId", "id", "movableFeastId", "seasonalDayId") SELECT "description", "fixedFeastId", "id", "movableFeastId", "seasonalDayId" FROM "Hora";
DROP TABLE "Hora";
ALTER TABLE "new_Hora" RENAME TO "Hora";
CREATE TABLE "new_HoraElement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "horaId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "blockType" TEXT NOT NULL,
    "blockId" INTEGER NOT NULL,
    CONSTRAINT "HoraElement_horaId_fkey" FOREIGN KEY ("horaId") REFERENCES "Hora" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HoraElement" ("blockId", "blockType", "horaId", "id", "order") SELECT "blockId", "blockType", "horaId", "id", "order" FROM "HoraElement";
DROP TABLE "HoraElement";
ALTER TABLE "new_HoraElement" RENAME TO "HoraElement";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "ActusLiturgicus_key_key" ON "ActusLiturgicus"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Gesture_name_key" ON "Gesture"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_name_key" ON "Actor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Posture_name_key" ON "Posture"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Position_name_key" ON "Position"("name");
