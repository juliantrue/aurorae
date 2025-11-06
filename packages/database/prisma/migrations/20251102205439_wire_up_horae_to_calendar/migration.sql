/*
  Warnings:

  - You are about to drop the column `riteId` on the `Hora` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `HoraElement` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hora" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "latinName" TEXT NOT NULL,
    "description" TEXT,
    "fixedFeastId" INTEGER,
    "movableFeastId" INTEGER,
    "seasonalDayId" INTEGER,
    CONSTRAINT "Hora_fixedFeastId_fkey" FOREIGN KEY ("fixedFeastId") REFERENCES "FixedFeast" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Hora_movableFeastId_fkey" FOREIGN KEY ("movableFeastId") REFERENCES "MovableFeast" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Hora_seasonalDayId_fkey" FOREIGN KEY ("seasonalDayId") REFERENCES "SeasonalDay" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Hora" ("description", "id", "key", "latinName") SELECT "description", "id", "key", "latinName" FROM "Hora";
DROP TABLE "Hora";
ALTER TABLE "new_Hora" RENAME TO "Hora";
CREATE UNIQUE INDEX "Hora_key_key" ON "Hora"("key");
CREATE TABLE "new_HoraElement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "horaId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "blockType" TEXT NOT NULL,
    "blockId" INTEGER NOT NULL,
    "note" TEXT,
    CONSTRAINT "HoraElement_horaId_fkey" FOREIGN KEY ("horaId") REFERENCES "Hora" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HoraElement" ("blockId", "blockType", "horaId", "id", "note", "order") SELECT "blockId", "blockType", "horaId", "id", "note", "order" FROM "HoraElement";
DROP TABLE "HoraElement";
ALTER TABLE "new_HoraElement" RENAME TO "HoraElement";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
