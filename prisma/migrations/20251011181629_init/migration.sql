-- CreateTable
CREATE TABLE "BibleTranslation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BibleBook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "translationId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    CONSTRAINT "BibleBook_translationId_fkey" FOREIGN KEY ("translationId") REFERENCES "BibleTranslation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BibleChapter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bookId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    CONSTRAINT "BibleChapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "BibleBook" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BibleVerse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chapterId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    CONSTRAINT "BibleVerse_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "BibleChapter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SourceMetadata" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "edition" TEXT,
    "publisher" TEXT,
    "publicationYear" INTEGER,
    "location" TEXT,
    "language" TEXT,
    "url" TEXT,
    "notes" TEXT
);

-- CreateTable
CREATE TABLE "LiturgicalDay" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT,
    "name" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "color" TEXT,
    "description" TEXT,
    "isMovable" BOOLEAN NOT NULL DEFAULT true,
    "precedence" INTEGER
);

-- CreateTable
CREATE TABLE "CalendarMapping" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gregorianDate" DATETIME NOT NULL,
    "liturgicalDayId" INTEGER NOT NULL,
    CONSTRAINT "CalendarMapping_liturgicalDayId_fkey" FOREIGN KEY ("liturgicalDayId") REFERENCES "LiturgicalDay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Psalm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER NOT NULL,
    "incipit" TEXT,
    "text" TEXT NOT NULL,
    "division" TEXT,
    "sourceId" INTEGER,
    CONSTRAINT "Psalm_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "SourceMetadata" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Hymn" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "incipit" TEXT,
    "text" TEXT NOT NULL,
    "meter" TEXT,
    "doxology" TEXT,
    "sourceId" INTEGER,
    CONSTRAINT "Hymn_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "SourceMetadata" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Office" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "liturgicalDayId" INTEGER NOT NULL,
    "hour" TEXT NOT NULL,
    "rubric" TEXT,
    CONSTRAINT "Office_liturgicalDayId_fkey" FOREIGN KEY ("liturgicalDayId") REFERENCES "LiturgicalDay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OfficePsalmAssignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "officeId" INTEGER NOT NULL,
    "psalmId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "verseRange" TEXT,
    CONSTRAINT "OfficePsalmAssignment_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "Office" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OfficePsalmAssignment_psalmId_fkey" FOREIGN KEY ("psalmId") REFERENCES "Psalm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OfficeHymnAssignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "officeId" INTEGER NOT NULL,
    "hymnId" INTEGER NOT NULL,
    "position" INTEGER,
    CONSTRAINT "OfficeHymnAssignment_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "Office" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OfficeHymnAssignment_hymnId_fkey" FOREIGN KEY ("hymnId") REFERENCES "Hymn" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Antiphon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "officeId" INTEGER,
    "text" TEXT NOT NULL,
    "tone" TEXT,
    "gabcId" INTEGER,
    "sourceId" INTEGER,
    CONSTRAINT "Antiphon_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "Office" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Antiphon_gabcId_fkey" FOREIGN KEY ("gabcId") REFERENCES "Chant" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Antiphon_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "SourceMetadata" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MassProper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "liturgicalDayId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "chantId" INTEGER,
    "sourceId" INTEGER,
    CONSTRAINT "MassProper_liturgicalDayId_fkey" FOREIGN KEY ("liturgicalDayId") REFERENCES "LiturgicalDay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MassProper_chantId_fkey" FOREIGN KEY ("chantId") REFERENCES "Chant" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "MassProper_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "SourceMetadata" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MassOrdinary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "chantId" INTEGER,
    "sourceId" INTEGER,
    "liturgicalDayId" INTEGER,
    CONSTRAINT "MassOrdinary_chantId_fkey" FOREIGN KEY ("chantId") REFERENCES "Chant" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "MassOrdinary_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "SourceMetadata" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "MassOrdinary_liturgicalDayId_fkey" FOREIGN KEY ("liturgicalDayId") REFERENCES "LiturgicalDay" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Chant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "gabc" TEXT NOT NULL,
    "mode" TEXT,
    "clef" TEXT,
    "sourceId" INTEGER,
    "audioUrl" TEXT,
    "imageUrl" TEXT,
    "hymnId" INTEGER,
    CONSTRAINT "Chant_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "SourceMetadata" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Chant_hymnId_fkey" FOREIGN KEY ("hymnId") REFERENCES "Hymn" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "LiturgicalDay_slug_key" ON "LiturgicalDay"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CalendarMapping_gregorianDate_key" ON "CalendarMapping"("gregorianDate");
