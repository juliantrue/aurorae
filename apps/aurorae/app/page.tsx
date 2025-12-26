import { HorariumClient } from './components/horarium-client';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="flex w-full max-w-aurorae flex-col gap-8">
      <HorariumClient />
    </div>
  );
}
