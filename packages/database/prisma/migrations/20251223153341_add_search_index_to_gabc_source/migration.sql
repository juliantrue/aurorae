/*
  Warnings:

  - Added the required column `searchKey` to the `GabcSource` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GabcSource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "gabc" TEXT NOT NULL,
    "searchKey" TEXT NOT NULL,
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
INSERT INTO "new_GabcSource" ("chantBlockId", "chantSourceId", "chantUsageId", "gabc", "id", "mode", "name", "responsePartId", "textBlockId") SELECT "chantBlockId", "chantSourceId", "chantUsageId", "gabc", "id", "mode", "name", "responsePartId", "textBlockId" FROM "GabcSource";
DROP TABLE "GabcSource";
ALTER TABLE "new_GabcSource" RENAME TO "GabcSource";
CREATE INDEX "GabcSource_chantSourceId_idx" ON "GabcSource"("chantSourceId");
CREATE INDEX "GabcSource_chantUsageId_idx" ON "GabcSource"("chantUsageId");
CREATE INDEX "GabcSource_searchKey_idx" ON "GabcSource"("searchKey");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
