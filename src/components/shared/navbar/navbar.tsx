import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import * as Icons from '@/components/icons';
import { buttonVariants } from '@/components/ui';
import { createClient } from '@/utils/supabase/server';

const Navbar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="fixed z-50 h-16 w-full bg-background">
      <nav className="z-51 container flex h-16 w-full items-center justify-between border-b bg-background sm:px-12">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/vercel.svg" width={80} height={60} alt="CSC" />

          <p>CSC</p>
        </Link>
        {user ? (
          <Link
            href="/signin"
            className={buttonVariants({ variant: 'outline' })}
          >
            Dashboard <Icons.ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        ) : (
          <Link
            href="/signin"
            className={buttonVariants({ variant: 'outline' })}
          >
            Sign In <Icons.ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
