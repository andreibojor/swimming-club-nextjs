import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full gap-5 p-6 sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/vercel.svg" width={80} height={80} alt="CSC" />

        <p className="max-sm:hidden">CSC</p>
      </Link>
    </nav>
  );
};

export default Navbar;
