import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import * as Icons from '@/components/icons';
import { buttonVariants } from '@/components/ui';

const Navbar = () => {
  return (
    <nav className="fixed z-50 flex h-16 w-full items-center justify-between gap-5 border-b bg-background p-6 sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/vercel.svg" width={80} height={80} alt="CSC" />

        <p className="max-sm:hidden">CSC</p>
      </Link>

      <Link href="/signin" className={buttonVariants({ variant: 'outline' })}>
        Sign In <Icons.ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </nav>
  );
};

export default Navbar;
