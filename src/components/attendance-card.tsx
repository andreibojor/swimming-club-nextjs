'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, Separator } from '@/components/ui';
import { Tables } from '@/types/types_db';
import { createClient } from '@/utils/supabase/client';
import { AttendanceButton } from './attendance-button';
import SwimmerCard from './swimmer-card';

const getInitials = (name: string) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return initials;
};

interface Props {
  student: Tables<'students'>;
  date: Date;
}
export function AttendanceCard({ student, date }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className="mt-2 flex items-center justify-between gap-2">
        <SwimmerCard student={student}>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarFallback>{getInitials(student?.full_name)}</AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-medium leading-none">
                {student.full_name}
              </p>
            </div>
            {/* {student.swimmer_level === 'beginner' && (
              <>
                <p className="text-sm font-medium leading-none">
                  Attendances Left:
                </p>
                <p className="text-sm font-medium">
                  {localStudentDetails?.lessons_left}
                </p>
              </>
            )} */}
          </div>
        </SwimmerCard>
        <AttendanceButton student={student} date={date} />
      </div>
      <Separator className="my-2" />
    </div>
  );
}
