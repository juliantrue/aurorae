-- CreateTable
CREATE TABLE "Rite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "RiteVersion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "promulgated" DATETIME,
    "notes" TEXT,
    "riteId" INTEGER NOT NULL,
    "parentId" INTEGER,
    CONSTRAINT "RiteVersion_riteId_fkey" FOREIGN KEY ("riteId") REFERENCES "Rite" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RiteVersion_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "RiteVersion" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Season" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "latinName" TEXT NOT NULL,
    "vernacular" TEXT,
    "color" TEXT,
    "description" TEXT,
    "riteVersionId" INTEGER NOT NULL,
    CONSTRAINT "Season_riteVersionId_fkey" FOREIGN KEY ("riteVersionId") REFERENCES "RiteVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rank" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "latinName" TEXT NOT NULL,
    "vernacular" TEXT,
    "precedence" INTEGER,
    "description" TEXT,
    "riteVersionId" INTEGER NOT NULL,
    CONSTRAINT "Rank_riteVersionId_fkey" FOREIGN KEY ("riteVersionId") REFERENCES "RiteVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MovableFeast" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "offsetFromEaster" INTEGER NOT NULL,
    "description" TEXT,
    "riteVersionId" INTEGER NOT NULL,
    "rankId" INTEGER NOT NULL,
    CONSTRAINT "MovableFeast_riteVersionId_fkey" FOREIGN KEY ("riteVersionId") REFERENCES "RiteVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovableFeast_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FixedFeast" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "description" TEXT,
    "riteVersionId" INTEGER NOT NULL,
    "rankId" INTEGER NOT NULL,
    CONSTRAINT "FixedFeast_riteVersionId_fkey" FOREIGN KEY ("riteVersionId") REFERENCES "RiteVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FixedFeast_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SeasonalDay" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "weekday" TEXT NOT NULL,
    "description" TEXT,
    "riteVersionId" INTEGER NOT NULL,
    "rankId" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,
    CONSTRAINT "SeasonalDay_riteVersionId_fkey" FOREIGN KEY ("riteVersionId") REFERENCES "RiteVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SeasonalDay_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SeasonalDay_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Rite_name_key" ON "Rite"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RiteVersion_slug_key" ON "RiteVersion"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Season_key_riteVersionId_key" ON "Season"("key", "riteVersionId");

-- CreateIndex
CREATE UNIQUE INDEX "Rank_key_riteVersionId_key" ON "Rank"("key", "riteVersionId");

-- CreateIndex
CREATE UNIQUE INDEX "MovableFeast_key_key" ON "MovableFeast"("key");

-- CreateIndex
CREATE UNIQUE INDEX "MovableFeast_key_riteVersionId_key" ON "MovableFeast"("key", "riteVersionId");

-- CreateIndex
CREATE UNIQUE INDEX "FixedFeast_key_key" ON "FixedFeast"("key");

-- CreateIndex
CREATE UNIQUE INDEX "FixedFeast_key_riteVersionId_key" ON "FixedFeast"("key", "riteVersionId");

-- CreateIndex
CREATE UNIQUE INDEX "SeasonalDay_key_key" ON "SeasonalDay"("key");

-- CreateIndex
CREATE UNIQUE INDEX "SeasonalDay_key_riteVersionId_key" ON "SeasonalDay"("key", "riteVersionId");
