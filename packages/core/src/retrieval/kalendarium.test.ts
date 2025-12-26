/**
 * High-signal, fully-commented test suite for the multi-rite liturgical
 * calendar resolver. Tests show how the resolver:
 *  - computes Easter (mocked)
 *  - resolves movable feasts (offset from Easter)
 *  - resolves fixed feasts (monthNumber/dayNumber)
 *  - falls back to seasonal days (season + week + weekday)
 *  - auto-detects EF vs OF seasonal rules by presence of season keys
 *  - walks the RiteVersion inheritance chain (child → parent → grandparent)
 *
 * NOTE: We mock @aurorae/database with an in-memory data store (globalThis.__DB)
 * so each test can specify the minimal data needed to assert behavior.
 */

/* -----------------------------
   0) MODULE MOCKS
------------------------------*/

// Mock the database package so our resolver uses in-memory arrays instead of a DB.
// We expose globalThis.__DB for test data, and implement just the methods the resolver calls.
jest.mock('@aurorae/database', () => {
  // Simple helpers for matching "where" filters used in the resolver.
  function matchWhere<T>(row: T, where: any): boolean {
    if (!where) return true;
    // Support AND of simple equals, including composite where used in tests
    return Object.keys(where).every((k) => {
      const cond = (where as any)[k];
      if (cond === undefined) return true;
      if (k === 'riteVersion') {
        // where: { riteVersion: { slug: "ROM1970" } }
        const rv = (row as any)['riteVersion'];
        return rv && rv.slug === cond.slug;
      }
      if (typeof cond === 'object' && cond !== null) {
        // Basic structural match (e.g., key_riteVersionId compound — not used here)
        return Object.keys(cond).every((subK) => (row as any)[k]?.[subK] === cond[subK]);
      }
      return (row as any)[k] === cond;
    });
  }

  class PrismaClient {
    // RITE VERSIONS (with parent linkage)
    riteVersion = {
      findUnique: jest.fn(async ({ where, include }: any) => {
        const row = (globalThis as any).__DB.riteVersions.find((v: any) => {
          if (where.id !== undefined) return v.id === where.id;
          if (where.slug !== undefined) return v.slug === where.slug;
          return false;
        });
        if (!row) return null;
        if (include?.parent) {
          const parent =
            row.parentId != null
              ? (globalThis as any).__DB.riteVersions.find((x: any) => x.id === row.parentId)
              : null;
          return { ...row, parent };
        }
        return row;
      }),
    };

    // SEASONS (used to detect EF vs OF by presence of certain keys)
    season = {
      findMany: jest.fn(async ({ where, select }: any) => {
        let rows = (globalThis as any).__DB.seasons.filter((s: any) =>
          where?.riteVersionId !== undefined ? s.riteVersionId === where.riteVersionId : true,
        );
        if (select?.key) {
          rows = rows.map((s: any) => ({ key: s.key }));
        }
        return rows;
      }),
      findFirst: jest.fn(async ({ where }: any) => {
        return (globalThis as any).__DB.seasons.find((s: any) => matchWhere(s, where)) || null;
      }),
    };

    // RANKS (joined when returning a feast/day)
    rank = {
      findFirst: jest.fn(async ({ where }: any) => {
        return (globalThis as any).__DB.ranks.find((r: any) => matchWhere(r, where)) || null;
      }),
    };

    // MOVABLE FEASTS (resolver calls findFirst with offset + riteVersionId)
    movableFeast = {
      findFirst: jest.fn(async ({ where, include }: any) => {
        const row = (globalThis as any).__DB.movableFeasts.find(
          (m: any) =>
            m.riteVersionId === where.riteVersionId &&
            m.offsetFromEaster === where.offsetFromEaster,
        );
        if (!row) return null;
        if (include?.rank) {
          const rank = (globalThis as any).__DB.ranks.find((r: any) => r.id === row.rankId);
          return { ...row, rank };
        }
        return row;
      }),
      findMany: jest.fn(async () => {
        return (globalThis as any).__DB.movableFeasts.slice();
      }),
    };

    // FIXED FEASTS (resolver calls findFirst with monthNumber/dayNumber + riteVersionId)
    fixedFeast = {
      findFirst: jest.fn(async ({ where, include }: any) => {
        const row = (globalThis as any).__DB.fixedFeasts.find(
          (f: any) =>
            f.riteVersionId === where.riteVersionId &&
            f.monthNumber === where.monthNumber &&
            f.dayNumber === where.dayNumber,
        );
        if (!row) return null;
        if (include?.rank) {
          const rank = (globalThis as any).__DB.ranks.find((r: any) => r.id === row.rankId);
          return { ...row, rank };
        }
        return row;
      }),
      findMany: jest.fn(async ({ where }: any) => {
        // Used rarely by older versions of resolver; keep for completeness
        return (globalThis as any).__DB.fixedFeasts.filter((f: any) => matchWhere(f, where));
      }),
    };

    // SEASONAL DAYS (resolver calls findFirst on constructed seasonal 'key')
    seasonalDay = {
      findFirst: jest.fn(async ({ where, include }: any) => {
        const row = (globalThis as any).__DB.seasonalDays.find(
          (s: any) => s.riteVersionId === where.riteVersionId && s.key === where.key,
        );
        if (!row) return null;
        const enriched: any = { ...row };
        if (include?.rank) {
          enriched.rank = (globalThis as any).__DB.ranks.find((r: any) => r.id === row.rankId);
        }
        if (include?.season) {
          enriched.season = (globalThis as any).__DB.seasons.find(
            (sc: any) => sc.id === row.seasonId,
          );
        }
        return enriched;
      }),
    };
  }

  const prisma = new PrismaClient();

  return {
    prisma,
    PrismaClient,
  };
});

// Mock the computus so dates are deterministic in tests.
// We include 2024 and 2025 (common test years). Add more as needed.
jest.mock('./computeCatholicEaster', () => {
  return {
    computeCatholicEaster: (year: number) => {
      if (year === 2024) return new Date(Date.UTC(2024, 2, 31)); // Mar 31, 2024
      if (year === 2025) return new Date(Date.UTC(2025, 3, 20)); // Apr 20, 2025
      // Fallback: simple constant to keep tests deterministic
      return new Date(Date.UTC(year, 3, 12)); // Apr 12 (arbitrary)
    },
  };
});

/* -----------------------------
   1) IMPORT THE SYSTEM UNDER TEST
------------------------------*/

import { resolveLiturgicalDay } from './kalendarium';

/* -----------------------------
   2) TEST DATA SETUP HELPERS
------------------------------*/

type RV = { id: number; slug: string; parentId?: number | null };
type Season = { id: number; key: string; name: string; riteVersionId: number };
type Rank = {
  id: number;
  key: string;
  name: string;
  precedence?: number;
  riteVersionId: number;
};
type Mov = {
  id: number;
  key: string;
  name: string;
  offsetFromEaster: number;
  rankId: number;
  riteVersionId: number;
};
type Fix = {
  id: number;
  key: string;
  name: string;
  yearNumber: number;
  monthNumber: number;
  dayNumber: number;
  rankId: number;
  riteVersionId: number;
};
type Sea = {
  id: number;
  key: string;
  seasonId: number;
  weekNumber: number;
  weekday: string;
  rankId: number;
  riteVersionId: number;
};

function seedBasicDB() {
  // Minimal three-tier version chain:
  // ROM1570 (no parent) ← ROM1962 (parent=1570) ← ROM1970 (parent=1962)
  const riteVersions: RV[] = [
    { id: 1, slug: 'ROM1570', parentId: null },
    { id: 2, slug: 'ROM1962', parentId: 1 },
    { id: 3, slug: 'ROM1970', parentId: 2 },
  ];

  // Seasons: EF versions (1570/1962) include Septuagesimae & PostPentecosten;
  // OF (1970) includes PerAnnum and *no* Septuagesimae.
  const seasons: Season[] = [
    // 1570 (EF)
    { id: 101, key: 'Adventus', name: 'Tempus Adventus', riteVersionId: 1 },
    { id: 102, key: 'Nativitatis', name: 'Tempus Nativitatis', riteVersionId: 1 },
    { id: 103, key: 'Septuagesimae', name: 'Tempus Septuagesimae', riteVersionId: 1 },
    { id: 104, key: 'Quadragesimae', name: 'Tempus Quadragesimae', riteVersionId: 1 },
    { id: 105, key: 'Paschale', name: 'Tempus Paschale', riteVersionId: 1 },
    { id: 106, key: 'PostPentecosten', name: 'Tempus post Pentecosten', riteVersionId: 1 },

    // 1962 (EF)
    { id: 201, key: 'Adventus', name: 'Tempus Adventus', riteVersionId: 2 },
    { id: 202, key: 'Nativitatis', name: 'Tempus Nativitatis', riteVersionId: 2 },
    { id: 203, key: 'Septuagesimae', name: 'Tempus Septuagesimae', riteVersionId: 2 },
    { id: 204, key: 'Quadragesimae', name: 'Tempus Quadragesimae', riteVersionId: 2 },
    { id: 205, key: 'Paschale', name: 'Tempus Paschale', riteVersionId: 2 },
    { id: 206, key: 'PostPentecosten', name: 'Tempus post Pentecosten', riteVersionId: 2 },

    // 1970 (OF)
    { id: 301, key: 'Adventus', name: 'Tempus Adventus', riteVersionId: 3 },
    { id: 302, key: 'Nativitatis', name: 'Tempus Nativitatis', riteVersionId: 3 },
    { id: 303, key: 'Quadragesimae', name: 'Tempus Quadragesimae', riteVersionId: 3 },
    { id: 304, key: 'Paschale', name: 'Tempus Paschale', riteVersionId: 3 },
    { id: 305, key: 'PerAnnum', name: 'Tempus per Annum', riteVersionId: 3 },
  ];

  // Ranks: keep it simple — ferial & solemnity with precedence values.
  const ranks: Rank[] = [
    { id: 1, key: 'ferialis', name: 'Ferialis', precedence: 99, riteVersionId: 1 },
    { id: 2, key: 'sollemnitas', name: 'Sollemnitas', precedence: 1, riteVersionId: 1 },

    { id: 3, key: 'ferialis', name: 'Ferialis', precedence: 99, riteVersionId: 2 },
    { id: 4, key: 'sollemnitas', name: 'Sollemnitas', precedence: 1, riteVersionId: 2 },

    { id: 5, key: 'ferialis', name: 'Ferialis', precedence: 99, riteVersionId: 3 },
    { id: 6, key: 'sollemnitas', name: 'Sollemnitas', precedence: 1, riteVersionId: 3 },
  ];

  // Movable feasts (by offset from Easter)
  const movableFeasts: Mov[] = [
    // Easter Sunday present at all levels
    {
      id: 11,
      key: 'EASTER_SUNDAY',
      name: 'Easter Sunday',
      offsetFromEaster: 0,
      rankId: 2,
      riteVersionId: 1,
    },
    {
      id: 12,
      key: 'EASTER_SUNDAY',
      name: 'Easter Sunday',
      offsetFromEaster: 0,
      rankId: 4,
      riteVersionId: 2,
    },
    {
      id: 13,
      key: 'EASTER_SUNDAY',
      name: 'Easter Sunday',
      offsetFromEaster: 0,
      rankId: 6,
      riteVersionId: 3,
    },

    // Ash Wednesday (OF & EF) — explicit in 1970 only to show direct match
    {
      id: 14,
      key: 'ASH_WEDNESDAY',
      name: 'Ash Wednesday',
      offsetFromEaster: -46,
      rankId: 6,
      riteVersionId: 3,
    },

    // Corpus Christi: present in 1962 only to test inheritance from parent
    {
      id: 15,
      key: 'CORPUS_CHRISTI',
      name: 'Corpus Christi',
      offsetFromEaster: 60,
      rankId: 4,
      riteVersionId: 2,
    },
  ];

  // Fixed feasts (Gregorian monthNumber/dayNumber)
  const fixedFeasts: Fix[] = [
    // Annunciation, present at 1970 level
    {
      id: 21,
      key: 'SOLEMNITY_ANNUNCIATION',
      name: 'Annuntiatio Domini',
      yearNumber: 1,
      monthNumber: 3,
      dayNumber: 25,
      rankId: 6,
      riteVersionId: 3,
    },

    // An older fixed feast only at 1570 to test grandparent inheritance
    {
      id: 22,
      key: 'OLD_FESTUM',
      name: 'Festum Vetus',
      yearNumber: 1,
      monthNumber: 2,
      dayNumber: 10,
      rankId: 2,
      riteVersionId: 1,
    },
  ];

  // Seasonal days: we include a few explicit rows to prove DB-backed seasonal lookup.
  const seasonalDays: Sea[] = [
    // 1970 — Thursday after Ash Wednesday: QUADRAGESIMAE_01_FeriaQuinta
    {
      id: 31,
      key: 'QUADRAGESIMAE_01_FeriaQuinta',
      seasonId: 303,
      weekNumber: 1,
      weekday: 'FeriaQuinta',
      rankId: 5, // ferialis (OF)
      riteVersionId: 3,
    },
    // 1962 — Septuagesima Sunday (week 1)
    {
      id: 32,
      key: 'SEPTUAGESIMAE_01_Dominica',
      seasonId: 203,
      weekNumber: 1,
      weekday: 'Dominica',
      rankId: 3, // ferialis (EF — ok for test)
      riteVersionId: 2,
    },
  ];

  (globalThis as any).__DB = {
    riteVersions,
    seasons,
    ranks,
    movableFeasts,
    fixedFeasts,
    seasonalDays,
  };
}

/* -----------------------------
   3) TESTS
------------------------------*/

describe('Liturgical calendar resolver (multi-rite + inheritance)', () => {
  beforeEach(() => {
    seedBasicDB();
  });

  test('MOVABLE (OF): Easter Sunday 2025 resolves from ROM1970 directly', async () => {
    // Easter 2025 mocked as 2025-04-20
    const date = new Date(Date.UTC(2025, 3, 20));
    const res = await resolveLiturgicalDay(date, 'ROM1970');

    expect(res.type).toBe('movable');
    expect(res.key).toBe('EASTER_SUNDAY');
    expect(res.name).toBe('Easter Sunday');
    expect(res.sourceVersion.slug).toBe('ROM1970');
    expect(res.rank.key).toBe('sollemnitas');
  });

  test('FIXED (OF): Annunciation (Mar 25, 2025) resolves as fixed from ROM1970', async () => {
    const date = new Date(Date.UTC(2025, 2, 25)); // March 25
    const res = await resolveLiturgicalDay(date, 'ROM1970');

    expect(res.type).toBe('fixed');
    expect(res.key).toBe('SOLEMNITY_ANNUNCIATION');
    expect(res.name).toMatch(/Annuntiatio Domini/i);
    expect(res.sourceVersion.slug).toBe('ROM1970');
    expect(res.rank.key).toBe('sollemnitas');
  });

  test('SEASONAL (OF): A Lenten ferial day falls back to seasonal key when no feast matches', async () => {
    // Thursday after Ash Wednesday in 2025 is Mar 6 (Easter Apr 20; Ash Wed Mar 5)
    const date = new Date(Date.UTC(2025, 2, 6));
    const res = await resolveLiturgicalDay(date, 'ROM1970');

    expect(res.type).toBe('seasonal');
    expect(res.key).toBe('QUADRAGESIMAE_01_FeriaQuinta');
    expect(res.name).toBe('QUADRAGESIMAE_01_FeriaQuinta' /* no custom desc in seed */);
    expect(res.rank.key).toBe('ferialis');
    expect(res.sourceVersion.slug).toBe('ROM1970');
  });

  test('EF vs OF mode: Septuagesima Sunday 2025 uses EF seasonal rules under ROM1962', async () => {
    // Septuagesima = 63 days before Easter (2025-04-20 → 2025-02-16)
    const date = new Date(Date.UTC(2025, 1, 16));
    const res = await resolveLiturgicalDay(date, 'ROM1962');

    expect(res.type).toBe('seasonal');
    expect(res.key).toBe('SEPTUAGESIMAE_01_Dominica');
    expect(res.sourceVersion.slug).toBe('ROM1962');
  });

  test('Inheritance (parent): ROM1970 inherits Corpus Christi (offset +60) defined only in ROM1962', async () => {
    // Easter 2025 = Apr 20 → +60 days = Jun 19, 2025
    const date = new Date(Date.UTC(2025, 5, 19));
    const res = await resolveLiturgicalDay(date, 'ROM1970');

    expect(res.type).toBe('movable');
    expect(res.key).toBe('CORPUS_CHRISTI');
    // Proves it came from ROM1962 (parent), not from ROM1970
    expect(res.sourceVersion.slug).toBe('ROM1962');
  });

  test('Inheritance (grandparent): ROM1970 inherits a fixed feast defined only in ROM1570', async () => {
    // OLD_FESTUM on Feb 10 — only in ROM1570
    const date = new Date(Date.UTC(2025, 1, 10));
    const res = await resolveLiturgicalDay(date, 'ROM1970');

    expect(res.type).toBe('fixed');
    expect(res.key).toBe('OLD_FESTUM');
    expect(res.name).toBe('Festum Vetus');
    // Comes from ROM1570 (grandparent)
    expect(res.sourceVersion.slug).toBe('ROM1570');
  });

  test('Seasonal fallback returns a synthetic ferial when SeasonalDay row is missing', async () => {
    // Pick a random Ordinary Time date with no explicit SeasonalDay in DB.
    const date = new Date(Date.UTC(2025, 6, 10)); // July 10, 2025
    const res = await resolveLiturgicalDay(date, 'ROM1970');

    expect(res.type).toBe('seasonal');
    expect(res.key).toMatch(/_Feria/); // some PerAnnum_*_Feria*
    // Fallback rank (synthetic) should be ferialis
    expect(res.rank.key).toBe('ferialis');
    expect(res.sourceVersion.slug).toBe('ROM1970'); // selected version as default source
  });

  test('Ash Wednesday 2025 is resolved as MOVABLE in ROM1970 (explicit offset -46)', async () => {
    const date = new Date(Date.UTC(2025, 2, 5)); // 2025-03-05
    const res = await resolveLiturgicalDay(date, 'ROM1970');

    expect(res.type).toBe('movable');
    expect(res.key).toBe('ASH_WEDNESDAY');
    expect(res.sourceVersion.slug).toBe('ROM1970');
  });
});
