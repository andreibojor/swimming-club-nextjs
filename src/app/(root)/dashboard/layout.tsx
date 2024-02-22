import { ReactNode } from 'react';

import { SiteFooter } from '@/components/footer';
import Navbar from '@/components/shared/navbar/navbar';

const DashboardLayout = (props: { children: ReactNode }) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex min-h-screen w-full flex-1 flex-col items-center pt-16">
        {props.children}
      </main>
      <SiteFooter className="self-center" />
    </div>
  );
};

export default DashboardLayout;
