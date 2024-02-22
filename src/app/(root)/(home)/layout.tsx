import { ReactNode } from 'react';

import Navbar from '@/components/shared/navbar/navbar';

export default function HomeLayout(props: { children: ReactNode }) {
  return (
    <main className="relative">
      <Navbar />
      <main className="flex min-h-screen w-full flex-1 flex-col items-center">
        {props.children}
      </main>
    </main>
  );
}
