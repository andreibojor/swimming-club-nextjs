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
  ScrollArea,
} from '@/components/ui';

const NotificationDropdown = async () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icons.Bell className="m-1 size-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-96">
        <DropdownMenuLabel>Notificări</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <ScrollArea className="h-[420px]">
          <DropdownMenuItem className="flex items-center gap-2">
            <Avatar className="size-10">
              <AvatarImage src={''} />
              <AvatarFallback className="text-md bg-primary text-slate-50">
                PTA
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-semibold">Paul Turcanu Andrei</p>
              <p>
                bazin <span className="font-semibold">Dej</span>{' '}
                <span className="font-semibold">26-03-2024</span> la ora{' '}
                <span className="font-semibold">14:00</span>
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2">
            <Avatar className="size-10">
              <AvatarImage src={''} />
              <AvatarFallback className="text-md bg-primary text-slate-50">
                PTA
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-semibold">Paul Turcanu Andrei</p>
              <p>
                bazin <span className="font-semibold">Dej</span>{' '}
                <span className="font-semibold">26-03-2024</span> la ora{' '}
                <span className="font-semibold">14:00</span>
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />{' '}
          <DropdownMenuItem className="flex items-center gap-2">
            <Avatar className="size-10">
              <AvatarImage src={''} />
              <AvatarFallback className="text-md bg-primary text-slate-50">
                PTA
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-semibold">Paul Turcanu Andrei</p>
              <p>
                bazin <span className="font-semibold">Dej</span>{' '}
                <span className="font-semibold">26-03-2024</span> la ora{' '}
                <span className="font-semibold">14:00</span>
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />{' '}
          <DropdownMenuItem className="flex items-center gap-2">
            <Avatar className="size-10">
              <AvatarImage src={''} />
              <AvatarFallback className="text-md bg-primary text-slate-50">
                PTA
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-semibold">Paul Turcanu Andrei</p>
              <p>
                bazin <span className="font-semibold">Dej</span>{' '}
                <span className="font-semibold">26-03-2024</span> la ora{' '}
                <span className="font-semibold">14:00</span>
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />{' '}
          <DropdownMenuItem className="flex items-center gap-2">
            <Avatar className="size-10">
              <AvatarImage src={''} />
              <AvatarFallback className="text-md bg-primary text-slate-50">
                PTA
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-semibold">Paul Turcanu Andrei</p>
              <p>
                bazin <span className="font-semibold">Dej</span>{' '}
                <span className="font-semibold">26-03-2024</span> la ora{' '}
                <span className="font-semibold">14:00</span>
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />{' '}
          <DropdownMenuItem className="flex items-center gap-2">
            <Avatar className="size-10">
              <AvatarImage src={''} />
              <AvatarFallback className="text-md bg-primary text-slate-50">
                PTA
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-semibold">Paul Turcanu Andrei</p>
              <p>
                bazin <span className="font-semibold">Dej</span>{' '}
                <span className="font-semibold">26-03-2024</span> la ora{' '}
                <span className="font-semibold">14:00</span>
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-center">
          <p className="text-primary">Toate notificările</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
