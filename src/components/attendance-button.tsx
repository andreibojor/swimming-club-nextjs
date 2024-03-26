'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { format } from 'date-fns';
import { toast } from 'sonner';

import * as Icons from '@/components/icons';
import { Button } from '@/components/ui';
import { Tables } from '@/types/types_db';
import { updatePresence } from '@/utils/actions/attendance';
import { createClient } from '@/utils/supabase/client';

interface Props {
  student: Tables<'students'>;
  date: Date;
}
export const AttendanceButton = ({ student, date, studentActivity }: Props) => {
  const pathname = usePathname();
  const supabase = createClient();

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
        // className="ml-auto bg-green-800 px-2 py-1 md:px-4 md:py-2"
        className={studentActivity?.status === 'present' ? 'bg-green-800' : ''}
      >
        <Icons.Check className="size-5" />
      </Button>
      <Button
        onClick={() => handleAttendance('absent')}
        variant="secondary"
        className={studentActivity?.status === 'absent' ? 'bg-red-500' : ''}
      >
        <Icons.Close className="size-5" />
      </Button>
    </>
  );
};
