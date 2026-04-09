'use client';

import { useNow } from './hooks/use-client-time';
import { Horarium } from './horarium';

export function HorariumClient() {
  const now = useNow({ clientOnly: true });

  if (!now) {
    return null;
  }

  return <Horarium now={now} />;
}
