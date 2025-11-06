import { prisma, OfficeHour } from '@aurorae/database';

export interface ImportedSection {
  key: string;
  body: string;
}

export interface ImportedOfficeMetadata {
  language: string;
  folder: string;
  fileName: string;
  sourcePath: string;
  slug: string;
  rank: {
    name: string | null;
    descriptor: string | null;
    precedence: number | null;
    raw: string | null;
  };
  rules: string[];
  scriptura?: string;
  hour: OfficeHour;
  sections: ImportedSection[];
}

export interface DatabaseOffice {
  id: number;
  hour: OfficeHour;
  metadata: ImportedOfficeMetadata;
}

export async function fetchOfficeBySlugAndHour(
  slug: string,
  hour: OfficeHour,
): Promise<DatabaseOffice | null> {
  const office = await prisma.office.findFirst({
    where: {
      hour,
      liturgicalDay: { slug },
    },
    select: {
      id: true,
      hour: true,
      rubric: true,
    },
  });

  if (!office) return null;

  let metadata: ImportedOfficeMetadata;

  try {
    metadata = JSON.parse(office.rubric) as ImportedOfficeMetadata;
  } catch (error) {
    throw new Error(
      `Failed to parse Office.rubric JSON for office ${office.id}: ${(error as Error).message}`,
    );
  }

  return {
    id: office.id,
    hour: office.hour,
    metadata,
  };
}

export async function closePrisma(): Promise<void> {
  await prisma.$disconnect();
}
