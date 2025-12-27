import { HorariumClient } from './components/horarium-client';

export default function Home() {
  return (
    <div className="flex h-full w-full max-w-none flex-col items-center justify-center gap-8">
      <HorariumClient />
    </div>
  );
}
