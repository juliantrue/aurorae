import { HorariumClient } from './components/horarium-client';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full max-w-none flex-col gap-8">
      <HorariumClient />
    </div>
  );
}
