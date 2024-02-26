import React from 'react';
import Image from 'next/image';
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
import { createClient } from '@/utils/supabase/server';

const Navbar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const initials = user?.user_metadata.full_name
    .split(' ')
    .map((n: string) => n[0])
    .join('');

  return (
    <div className="fixed z-50 h-16 w-full bg-background">
      <nav className="z-51 container flex h-16 w-full items-center justify-between border-b bg-background sm:px-12">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/vercel.svg" width={80} height={60} alt="CSC" />

          <p>CSC</p>
        </Link>
        {user ? (
          <Link
            href="/dashboard"
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

        {/* Avatar User After Login */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative size-9 rounded-full">
              <Avatar className="size-9">
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
              <DropdownMenuItem asChild>
                <Link href={`/profile/${user?.id}`}>
                  <Icons.User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/${user?.id}/billing`}>
                  <Icons.CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/signout">
                <Icons.LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  );
};

export default Navbar;
