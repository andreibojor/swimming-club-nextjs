import { redirect } from 'next/navigation';

import * as Icons from '@/components/icons';
import { Button } from '@/components/ui';
import { createClient } from '@/utils/supabase/server';

export default function SignOut() {
  const signOut = async () => {
    'use server';

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/');
  };

  return (
    <form action={signOut} className="px-0 py-0">
      <Button
        variant={'ghost'}
        className="w-full flex-1 justify-start px-2  text-sm font-[400]"
      >
        <Icons.LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </Button>
    </form>
  );
}
