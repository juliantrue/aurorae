'use client';

import { useEffect, useState } from 'react';
import { Horarium } from './horarium';

export function HorariumClient() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  if (!now) {
    return null;
  }

  return <Horarium now={now} />;
}
