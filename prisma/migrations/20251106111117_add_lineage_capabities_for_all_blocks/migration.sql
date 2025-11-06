-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChantBlock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "tone" TEXT,
    "chantBlockGenusId" INTEGER NOT NULL,
    "parentId" INTEGER,
    CONSTRAINT "ChantBlock_chantBlockGenusId_fkey" FOREIGN KEY ("chantBlockGenusId") REFERENCES "ChantBlockGenus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChantBlock_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ChantBlock" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ChantBlock" ("chantBlockGenusId", "id", "text", "title", "tone") SELECT "chantBlockGenusId", "id", "text", "title", "tone" FROM "ChantBlock";
DROP TABLE "ChantBlock";
ALTER TABLE "new_ChantBlock" RENAME TO "ChantBlock";
CREATE TABLE "new_RefBlock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "seqStart" INTEGER NOT NULL,
    "seqEnd" INTEGER NOT NULL,
    "refBlockGenusId" INTEGER NOT NULL,
    "textSourceId" INTEGER NOT NULL,
    "parentId" INTEGER,
    "startUnitId" INTEGER NOT NULL,
    "endUnitId" INTEGER NOT NULL,
    "chantBlockId" INTEGER,
    CONSTRAINT "RefBlock_refBlockGenusId_fkey" FOREIGN KEY ("refBlockGenusId") REFERENCES "RefBlockGenus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RefBlock_textSourceId_fkey" FOREIGN KEY ("textSourceId") REFERENCES "TextSource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RefBlock_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "RefBlock" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "RefBlock_startUnitId_fkey" FOREIGN KEY ("startUnitId") REFERENCES "TextUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RefBlock_endUnitId_fkey" FOREIGN KEY ("endUnitId") REFERENCES "TextUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RefBlock_chantBlockId_fkey" FOREIGN KEY ("chantBlockId") REFERENCES "ChantBlock" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_RefBlock" ("endUnitId", "id", "refBlockGenusId", "seqEnd", "seqStart", "startUnitId", "textSourceId", "title") SELECT "endUnitId", "id", "refBlockGenusId", "seqEnd", "seqStart", "startUnitId", "textSourceId", "title" FROM "RefBlock";
DROP TABLE "RefBlock";
ALTER TABLE "new_RefBlock" RENAME TO "RefBlock";
CREATE TABLE "new_ResponseSequence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "kind" TEXT NOT NULL DEFAULT 'OTHER',
    "parentId" INTEGER,
    CONSTRAINT "ResponseSequence_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ResponseSequence" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ResponseSequence" ("description", "id", "kind", "title") SELECT "description", "id", "kind", "title" FROM "ResponseSequence";
DROP TABLE "ResponseSequence";
ALTER TABLE "new_ResponseSequence" RENAME TO "ResponseSequence";
CREATE TABLE "new_TextBlock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "title" TEXT,
    "genusId" INTEGER NOT NULL,
    "parentId" INTEGER,
    CONSTRAINT "TextBlock_genusId_fkey" FOREIGN KEY ("genusId") REFERENCES "TextBlockGenus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TextBlock_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "TextBlock" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TextBlock" ("genusId", "id", "text", "title") SELECT "genusId", "id", "text", "title" FROM "TextBlock";
DROP TABLE "TextBlock";
ALTER TABLE "new_TextBlock" RENAME TO "TextBlock";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
