import { prisma } from '@aurorae/database';
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

  const normalizedTitle = title.toLocaleLowerCase();
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

  const baseChantSourceFilter: Prisma.ChantSourceWhereInput = {
    year: parsedYear,
  };

  const strictWhere: Prisma.GabcSourceWhereInput = {
    chantSource: {
      is: {
        ...baseChantSourceFilter,
        title: {
          contains: sourceName,
        },
      },
    },
  };

  const directMatches = await prisma.gabcSource.findMany({
    ...sharedArgs,
    where: {
      ...strictWhere,
      name: {
        contains: title,
      },
    },
  });

  if (directMatches.length > 0) {
    return directMatches;
  }

  const fallbackMatches = await prisma.gabcSource.findMany({
    ...sharedArgs,
    where: {
      chantSource: {
        is: baseChantSourceFilter,
      },
    },
  });

  return fallbackMatches.filter((chant) => {
    const matchesTitle = chant.name.toLocaleLowerCase().includes(normalizedTitle);
    const matchesSourceName = chant.chantSource.title
      .toLocaleLowerCase()
      .includes(normalizedSourceName);
    return matchesTitle && matchesSourceName;
  });
}
