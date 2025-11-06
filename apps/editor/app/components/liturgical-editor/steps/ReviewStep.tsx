'use client';

import { BlockType, RiteDefinition } from '../../liturgical-editor';
import { useMemo } from 'react';

export function ReviewStep({
  rite,
  blockTypeLabels
}: {
  rite: RiteDefinition;
  blockTypeLabels: Record<BlockType, string>;
}) {
  const summary = useMemo(() => JSON.stringify(rite, null, 2), [rite]);

  return (
    <section className="review">
      <h2>Review Definition</h2>
      <p>
        The review stage surfaces the composed rite configuration as JSON data that can be submitted
        to persistence or used with Prisma. Earlier steps will populate this once implemented.
      </p>
      <pre>{summary}</pre>
      <details>
        <summary>Block type reference</summary>
        <ul>
          {Object.entries(blockTypeLabels).map(([key, label]) => (
            <li key={key}>
              {key}: {label}
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}

