'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import * as Icons from '@/components/icons';
import { Button } from '@/components/ui';
import { Tables } from '@/types/types_db';
import { updatePresence } from '@/utils/actions/attendance';

interface Props {
  student: Tables<'students'>;
}

export const AttendanceButton = ({ student, date }: Props) => {
  const pathname = usePathname();

  const [isPresent, setIsPresent] = useState(false);
  console.log(date);
  const handleAttendance = async (attendance: 'present' | 'absent') => {
    try {
      await updatePresence({
        studentId: student.id,
        lessonsLeft: student.lessons_left,
        date: date,
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
        variant="outline"
        className="ml-auto px-2 py-1 md:px-4 md:py-2"
      >
        <Icons.Check className="size-5 text-muted-foreground" />
      </Button>
      <Button
        onClick={() => handleAttendance('absent')}
        variant="outline"
        className="ml-auto px-2 py-1 md:px-4 md:py-2"
      >
        <Icons.Close className="size-5 text-muted-foreground" />
      </Button>
    </>
  );
};
