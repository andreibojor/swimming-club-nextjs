import React from 'react';
import Link from 'next/link';

import * as Icons from '@/components/icons';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  buttonVariants,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import { getUserDetails } from '@/utils/actions/user';
import { createClient } from '@/utils/supabase/server';
import SignOut from '../../forms/auth-forms/sign-out';

const Navbar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const initials = user?.user_metadata.full_name
    .split(' ')
    .map((n: string) => n[0])
    .join('');

  let userRole = null;
  if (user) {
    userRole = await getUserDetails({ userId: user?.id });
  }

  return (
    <div className="fixed z-50 h-16 w-full bg-background">
      <nav className="z-51 container flex h-16 w-full items-center justify-between border-b bg-background sm:px-12">
        <Link href="/" className="flex items-center gap-1">
          <p className="text-xl font-semibold text-primary">C S C</p>
        </Link>

        {/* Avatar User After Login */}
        {user ? (
          <div className="flex items-center gap-2">
            {(userRole?.role === 'admin' || userRole?.role === 'teacher') && (
              <Icons.Bell className="m-1 size-6" />
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative size-10 rounded-full"
                >
                  <Avatar>
                    <AvatarImage
                      src={user?.user_metadata.avatar_url}
                      alt={user?.user_metadata.full_name ?? ''}
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.user_metadata.full_name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.user_metadata.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {userRole?.role === 'admin' ||
                  userRole?.role === 'teacher' ? (
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard`}>
                        <Icons.User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link href={`/profile/${user?.id}`}>
                        <Icons.User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem asChild>
                    <Link href={`#`}>
                      <Icons.CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Icons.Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Icons.PlusCircle className="mr-2 h-4 w-4" />
                    <span>New Team</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <SignOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
