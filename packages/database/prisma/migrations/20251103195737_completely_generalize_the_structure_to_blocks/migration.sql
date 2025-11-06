/*
  Warnings:

  - You are about to drop the `Actor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Antiphon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Canticle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gesture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hymn` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Oratio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OratioGenus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Posture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Psalm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reading` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `actorId` on the `ActusLiturgicus` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `ActusLiturgicus` table. All the data in the column will be lost.
  - You are about to drop the column `gestureId` on the `ActusLiturgicus` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `ActusLiturgicus` table. All the data in the column will be lost.
  - You are about to drop the column `positionId` on the `ActusLiturgicus` table. All the data in the column will be lost.
  - You are about to drop the column `postureId` on the `ActusLiturgicus` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ActusLiturgicus` table. All the data in the column will be lost.
  - You are about to drop the column `antiphonId` on the `GabcSource` table. All the data in the column will be lost.
  - You are about to drop the column `hymnId` on the `GabcSource` table. All the data in the column will be lost.
  - You are about to drop the column `oratioId` on the `GabcSource` table. All the data in the column will be lost.
  - Added the required column `action` to the `ActusLiturgicus` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Actor_name_key";

-- DropIndex
DROP INDEX "Gesture_name_key";

-- DropIndex
DROP INDEX "Position_name_key";

-- DropIndex
DROP INDEX "Posture_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Actor";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Antiphon";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Canticle";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Gesture";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Hymn";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Oratio";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OratioGenus";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Position";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Posture";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Psalm";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Reading";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TextBlock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "title" TEXT,
    "genusId" INTEGER NOT NULL,
    CONSTRAINT "TextBlock_genusId_fkey" FOREIGN KEY ("genusId") REFERENCES "TextBlockGenus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TextBlockGenus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RefBlock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "seqStart" INTEGER NOT NULL,
    "seqEnd" INTEGER NOT NULL,
    "refBlockGenusId" INTEGER NOT NULL,
    "textSourceId" INTEGER NOT NULL,
    "startUnitId" INTEGER NOT NULL,
    "endUnitId" INTEGER NOT NULL,
    CONSTRAINT "RefBlock_refBlockGenusId_fkey" FOREIGN KEY ("refBlockGenusId") REFERENCES "RefBlockGenus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RefBlock_textSourceId_fkey" FOREIGN KEY ("textSourceId") REFERENCES "TextSource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RefBlock_startUnitId_fkey" FOREIGN KEY ("startUnitId") REFERENCES "TextUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RefBlock_endUnitId_fkey" FOREIGN KEY ("endUnitId") REFERENCES "TextUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RefBlockGenus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ChantBlock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "tone" TEXT,
    "chantBlockGenusId" INTEGER NOT NULL,
    CONSTRAINT "ChantBlock_chantBlockGenusId_fkey" FOREIGN KEY ("chantBlockGenusId") REFERENCES "ChantBlockGenus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChantBlockGenus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ActusLiturgicus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "action" TEXT NOT NULL
);
INSERT INTO "new_ActusLiturgicus" ("id") SELECT "id" FROM "ActusLiturgicus";
DROP TABLE "ActusLiturgicus";
ALTER TABLE "new_ActusLiturgicus" RENAME TO "ActusLiturgicus";
CREATE TABLE "new_GabcSource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "gabc" TEXT NOT NULL,
    "chantSourceId" INTEGER NOT NULL,
    "chantUsageId" INTEGER NOT NULL,
    "textBlockId" INTEGER,
    "chantBlockId" INTEGER,
    "responsePartId" INTEGER,
    CONSTRAINT "GabcSource_chantSourceId_fkey" FOREIGN KEY ("chantSourceId") REFERENCES "ChantSource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_chantUsageId_fkey" FOREIGN KEY ("chantUsageId") REFERENCES "ChantUsage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_textBlockId_fkey" FOREIGN KEY ("textBlockId") REFERENCES "TextBlock" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_chantBlockId_fkey" FOREIGN KEY ("chantBlockId") REFERENCES "ChantBlock" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GabcSource_responsePartId_fkey" FOREIGN KEY ("responsePartId") REFERENCES "ResponsePart" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GabcSource" ("chantSourceId", "chantUsageId", "gabc", "id", "mode", "name", "responsePartId") SELECT "chantSourceId", "chantUsageId", "gabc", "id", "mode", "name", "responsePartId" FROM "GabcSource";
DROP TABLE "GabcSource";
ALTER TABLE "new_GabcSource" RENAME TO "GabcSource";
CREATE INDEX "GabcSource_chantSourceId_idx" ON "GabcSource"("chantSourceId");
CREATE INDEX "GabcSource_chantUsageId_idx" ON "GabcSource"("chantUsageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
