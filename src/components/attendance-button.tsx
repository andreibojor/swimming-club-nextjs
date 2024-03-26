'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { format } from 'date-fns';

import * as Icons from '@/components/icons';
import { Button } from '@/components/ui';
import { Tables } from '@/types/types_db';
import { updatePresence } from '@/utils/actions/attendance';
import { createClient } from '@/utils/supabase/client';

interface Props {
  student: Tables<'students'>;
  date: Date;
}
export const AttendanceButton = ({ student, date }: Props) => {
  const pathname = usePathname();
  console.log(student.lessons_left);
  const handleAttendance = async (attendance: 'present' | 'absent') => {
    try {
      await updatePresence({
        studentId: student.id,
        lessonsLeft: student.lessons_left,
        date: format(date, 'yyyy-MM-dd'),
        attendance: attendance,
        path: pathname,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <>
      <Button
        onClick={() => handleAttendance('present')}
        variant="secondary"
        className="ml-auto bg-green-800 px-2 py-1 md:px-4 md:py-2"
      >
        <Icons.Check className="size-5 " />
      </Button>
      <Button
        onClick={() => handleAttendance('absent')}
        variant="secondary"
        className="ml-auto bg-red-500 px-2 py-1 md:px-4 md:py-2"
      >
        <Icons.Close className="size-5" />
      </Button>
    </>
  );
};
