import { prisma } from '@aurorae/database';
import type { Prisma } from '@aurorae/database';

export type OrdoChant = Prisma.GabcSourceGetPayload<{
  include: {
    chantSource: true;
    chantUsage: true;
  };
}>;

/**
 * Locate chants for a given ordo part by matching the printed title inside a specific source.
 */
export async function getOrdoChants(
  chantSourceCode: string,
  chantTitle: string,
): Promise<OrdoChant[]> {
  const sourceCode = chantSourceCode.trim();
  const title = chantTitle.trim();
  if (!sourceCode || !title) {
    return [];
  }

  const normalizedTitle = title.toLocaleLowerCase();
  const sharedArgs = {
    include: {
      chantSource: true,
      chantUsage: true,
    },
    orderBy: {
      id: 'asc' as const,
    },
  };

  const baseWhere: Prisma.GabcSourceWhereInput = {
    chantSource: {
      is: {
        code: sourceCode,
      },
    },
  };

  const directMatches = await prisma.gabcSource.findMany({
    ...sharedArgs,
    where: {
      ...baseWhere,
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
    where: baseWhere,
  });

  return fallbackMatches.filter((chant) =>
    chant.name.toLocaleLowerCase().includes(normalizedTitle),
  );
}
