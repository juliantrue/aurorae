-- CreateTable
CREATE TABLE "TextSource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "language" TEXT NOT NULL,
    "category" TEXT,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "TextSection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "textSourceId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT,
    "order" INTEGER,
    "parentId" INTEGER,
    CONSTRAINT "TextSection_textSourceId_fkey" FOREIGN KEY ("textSourceId") REFERENCES "TextSource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TextSection_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "TextSection" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TextUnit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "textSourceId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "sequence" INTEGER NOT NULL,
    "label" TEXT,
    "text" TEXT NOT NULL,
    "refExternal" TEXT,
    CONSTRAINT "TextUnit_textSourceId_fkey" FOREIGN KEY ("textSourceId") REFERENCES "TextSource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TextUnit_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "TextSection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OratioCommunis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "riteId" INTEGER,
    CONSTRAINT "OratioCommunis_riteId_fkey" FOREIGN KEY ("riteId") REFERENCES "Rite" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Psalm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER,
    "incipit" TEXT,
    "seqStart" INTEGER NOT NULL,
    "seqEnd" INTEGER NOT NULL,
    "textSourceId" INTEGER NOT NULL,
    "startUnitId" INTEGER NOT NULL,
    "endUnitId" INTEGER NOT NULL,
    CONSTRAINT "Psalm_textSourceId_fkey" FOREIGN KEY ("textSourceId") REFERENCES "TextSource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Psalm_startUnitId_fkey" FOREIGN KEY ("startUnitId") REFERENCES "TextUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Psalm_endUnitId_fkey" FOREIGN KEY ("endUnitId") REFERENCES "TextUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Canticle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "source" TEXT,
    "seqStart" INTEGER NOT NULL,
    "seqEnd" INTEGER NOT NULL,
    "textSourceId" INTEGER NOT NULL,
    "startUnitId" INTEGER NOT NULL,
    "endUnitId" INTEGER NOT NULL,
    CONSTRAINT "Canticle_textSourceId_fkey" FOREIGN KEY ("textSourceId") REFERENCES "TextSource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Canticle_startUnitId_fkey" FOREIGN KEY ("startUnitId") REFERENCES "TextUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Canticle_endUnitId_fkey" FOREIGN KEY ("endUnitId") REFERENCES "TextUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reading" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reference" TEXT,
    "seqStart" INTEGER NOT NULL,
    "seqEnd" INTEGER NOT NULL,
    "textSourceId" INTEGER NOT NULL,
    "startUnitId" INTEGER NOT NULL,
    "endUnitId" INTEGER NOT NULL,
    CONSTRAINT "Reading_textSourceId_fkey" FOREIGN KEY ("textSourceId") REFERENCES "TextSource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reading_startUnitId_fkey" FOREIGN KEY ("startUnitId") REFERENCES "TextUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reading_endUnitId_fkey" FOREIGN KEY ("endUnitId") REFERENCES "TextUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Hymn" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "text" TEXT
);

-- CreateTable
CREATE TABLE "Antiphon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "incipit" TEXT NOT NULL,
    "text" TEXT
);

-- CreateTable
CREATE TABLE "Responsory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "incipit" TEXT NOT NULL,
    "text" TEXT
);

-- CreateTable
CREATE TABLE "Collect" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "incipit" TEXT NOT NULL,
    "text" TEXT
);

-- CreateTable
CREATE TABLE "Benediction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Versicle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "textV" TEXT NOT NULL,
    "textR" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Rubric" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "instruction" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Hora" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "latinName" TEXT NOT NULL,
    "description" TEXT,
    "riteId" INTEGER,
    CONSTRAINT "Hora_riteId_fkey" FOREIGN KEY ("riteId") REFERENCES "Rite" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HoraElement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "horaId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "blockType" TEXT NOT NULL,
    "blockId" INTEGER NOT NULL,
    "note" TEXT,
    CONSTRAINT "HoraElement_horaId_fkey" FOREIGN KEY ("horaId") REFERENCES "Hora" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "TextSource_code_key" ON "TextSource"("code");

-- CreateIndex
CREATE INDEX "TextSection_textSourceId_order_idx" ON "TextSection"("textSourceId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "TextSection_textSourceId_code_key" ON "TextSection"("textSourceId", "code");

-- CreateIndex
CREATE INDEX "TextUnit_textSourceId_sectionId_sequence_idx" ON "TextUnit"("textSourceId", "sectionId", "sequence");

-- CreateIndex
CREATE UNIQUE INDEX "TextUnit_sectionId_sequence_key" ON "TextUnit"("sectionId", "sequence");

-- CreateIndex
CREATE UNIQUE INDEX "OratioCommunis_key_key" ON "OratioCommunis"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Hora_key_key" ON "Hora"("key");
