import { normalizeChantSearchKey, prisma } from '@aurorae/database';
import type { Prisma } from '@aurorae/database';

export type OrdoChant = Prisma.GabcSourceGetPayload<{
  include: {
    chantSource: true;
    chantUsage: true;
  };
}>;

export type ChantSourceFilter = {
  name: string;
  year: number;
};

export async function assertChantSourceExists(chantSource: ChantSourceFilter): Promise<void> {
  const sourceName = chantSource.name.trim();
  const parsedYear = Number(chantSource.year);

  if (!sourceName || Number.isNaN(parsedYear)) {
    throw new Error('Chant source not found.');
  }

  const normalizedSourceName = sourceName.toLocaleLowerCase();
  const candidates = await prisma.chantSource.findMany({
    where: { year: parsedYear },
    select: { title: true },
  });

  const hasMatch = candidates.some((source) =>
    source.title.toLocaleLowerCase().includes(normalizedSourceName),
  );
  if (!hasMatch) {
    throw new Error(`Chant source not found: ${sourceName} (${parsedYear}).`);
  }
}

/**
 * Locate chants inside a particular printed source using its title and year plus the chant title.
 */
export async function getOrdoChants(
  chantTitle: string,
  chantSource: ChantSourceFilter,
): Promise<OrdoChant[]> {
  const title = chantTitle.trim();
  const sourceName = chantSource.name.trim();
  const parsedYear = Number(chantSource.year);

  if (!title || !sourceName || Number.isNaN(parsedYear)) {
    return [];
  }

  const normalizedTitle = normalizeChantSearchKey(title);
  const normalizedSourceName = sourceName.toLocaleLowerCase();

  const sharedArgs = {
    include: {
      chantSource: true,
      chantUsage: true,
    },
    orderBy: {
      id: 'asc' as const,
    },
  };

  const directMatches = await prisma.gabcSource.findMany({
    ...sharedArgs,
    where: {
      chantSource: {
        year: parsedYear,
        title: {
          contains: normalizedSourceName,
        },
      },
      searchKey: {
        contains: normalizedTitle,
      },
    },
  });
  return directMatches;
}
