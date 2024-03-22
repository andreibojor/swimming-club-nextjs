'use client';

import { useState } from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Separator,
} from '@/components/ui';
import { Tables } from '@/types/types_db';
import { createClient } from '@/utils/supabase/client';
import { AttendanceButton } from './attendance-button';
import SwimmerCard from './swimmer-card';

interface Props {
  student: Tables<'students'>;
}
export function AttendanceCard({ student, date }: Props) {
  const [lessonsLeft, setLessonsLeft] = useState(student.lessons_left);

  const getInitials = (name: string) => {
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('');

    return initials;
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="mt-2 flex items-center justify-between gap-2">
        <SwimmerCard student={student}>
          <div className="flex items-center space-x-2">
            <Avatar>
              {/* <AvatarImage src={`${student?.avatar_url}`} /> */}
              <AvatarFallback>{getInitials(student?.full_name)}</AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-medium leading-none">
                {student.full_name}
              </p>
            </div>
            {student.swimmer_level === 'beginner' && (
              <>
                <p className="text-sm font-medium leading-none">
                  Attendances Left:
                </p>
                <p className="text-sm font-medium">{lessonsLeft}</p>
              </>
            )}
          </div>
        </SwimmerCard>
        <AttendanceButton student={student} date={date} />

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <Icons.DotsHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={pools.name}>
                  {pools.map((pool) => (
                    <DropdownMenuRadioItem key={pool.id} value={pool.value}>
                      {pool.name}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
                <DropdownMenuRadioGroup value={`${student.pool}`}>
                  <DropdownMenuRadioItem value="Cluj-Napoca">
                    Cluj-Napoca
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Dej">Dej</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Sancraiu">
                    Sancraiu
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      {/* <Progress value={student.lessons_left} max={25} className="h-1 w-full" /> */}
      <Separator className="my-2" />
    </div>
  );
}
