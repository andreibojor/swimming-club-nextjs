import { ReactNode } from 'react';

import { SiteFooter } from '@/components/footer';
import Navbar from '@/components/shared/navbar/navbar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Navbar /> */}
      <main className="flex min-h-screen w-full flex-1 flex-col items-center pt-16">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
};

export default DashboardLayout;
