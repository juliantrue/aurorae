-- CreateTable
CREATE TABLE "Missa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "fixedFeastId" INTEGER,
    "movableFeastId" INTEGER,
    "seasonalDayId" INTEGER,
    CONSTRAINT "Missa_fixedFeastId_fkey" FOREIGN KEY ("fixedFeastId") REFERENCES "FixedFeast" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Missa_movableFeastId_fkey" FOREIGN KEY ("movableFeastId") REFERENCES "MovableFeast" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Missa_seasonalDayId_fkey" FOREIGN KEY ("seasonalDayId") REFERENCES "SeasonalDay" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MissaElement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "missaId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "blockType" TEXT NOT NULL,
    "blockId" INTEGER NOT NULL,
    CONSTRAINT "MissaElement_missaId_fkey" FOREIGN KEY ("missaId") REFERENCES "Missa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
