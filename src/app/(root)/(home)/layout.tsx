import { ReactNode } from 'react';

export default function HomeLayout(props: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen w-full flex-1 flex-col items-center">
      {props.children}
    </main>
  );
}
