'use client';

import { usePathname, useRouter } from 'next/navigation';

import * as Icons from '@/components/icons';
import { Button } from '@/components/ui';
import { handleRequest } from '@/utils/auth-helpers/client';
import { SignOut } from '@/utils/auth-helpers/server';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';

export default function SignOutButton() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  return (
    <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
      <input type="hidden" name="pathName" value={usePathname()} />
      <Button type="submit">
        <Icons.LogOut className="mr-2 h-4 w-4" />
        <span>Sign out</span>
      </Button>
    </form>
  );
}
