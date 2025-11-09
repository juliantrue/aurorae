/*
  Warnings:

  - You are about to drop the column `condition` on the `ConflictResolutionRule` table. All the data in the column will be lost.
  - You are about to drop the column `transferTo` on the `ConflictResolutionRule` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ConflictResolutionRule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "onConflict" TEXT NOT NULL,
    "notes" TEXT,
    "transferDefinitionId" TEXT,
    "riteVersionId" INTEGER NOT NULL,
    "rankId" INTEGER,
    "movableFeastId" INTEGER,
    "fixedFeastId" INTEGER,
    "onConflictTransferDefinitionId" INTEGER,
    CONSTRAINT "ConflictResolutionRule_onConflictTransferDefinitionId_fkey" FOREIGN KEY ("onConflictTransferDefinitionId") REFERENCES "OnConflictTransferDefinition" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ConflictResolutionRule_riteVersionId_fkey" FOREIGN KEY ("riteVersionId") REFERENCES "RiteVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ConflictResolutionRule_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ConflictResolutionRule_movableFeastId_fkey" FOREIGN KEY ("movableFeastId") REFERENCES "MovableFeast" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ConflictResolutionRule_fixedFeastId_fkey" FOREIGN KEY ("fixedFeastId") REFERENCES "FixedFeast" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ConflictResolutionRule" ("fixedFeastId", "id", "movableFeastId", "notes", "onConflict", "rankId", "riteVersionId") SELECT "fixedFeastId", "id", "movableFeastId", "notes", "onConflict", "rankId", "riteVersionId" FROM "ConflictResolutionRule";
DROP TABLE "ConflictResolutionRule";
ALTER TABLE "new_ConflictResolutionRule" RENAME TO "ConflictResolutionRule";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
