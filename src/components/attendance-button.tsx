'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { format } from 'date-fns';
import { toast } from 'sonner';

import * as Icons from '@/components/icons';
import { Button } from '@/components/ui';
import { Tables } from '@/types/types_db';
import { updateAbsence, updatePresence } from '@/utils/actions/attendance';
import { createClient } from '@/utils/supabase/client';

interface Props {
  student: Tables<'students'>;
  date: Date;
}
export const AttendanceButton = ({ student, date, studentActivity }: Props) => {
  const pathname = usePathname();

  const supabase = createClient();
  useEffect(() => {
    const changes = supabase
      .channel(`attendance_record_${student.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'students',
        },
        async (payload) => {
          const { data, error } = await supabase
            .from('students')
            .select('*')
            .match({ id: payload.new.id })
            .single();

          if (error) {
            toast.error(error.message);
          } else {
            toast.info(
              `${payload.new.full_name} lessons left: ${payload.new.lessons_left}`,
            );
          }
        },
      )
      .subscribe();

    return () => {
      changes.unsubscribe();
    };
  }, [date, student.id, supabase]);

  const handlePresence = async (attendance: string) => {
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

  const handleAbsence = async (attendance: string) => {
    try {
      await updateAbsence({
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
        onClick={() => handlePresence('present')}
        variant="secondary"
        className="bg-green-800"
      >
        <Icons.Check className="size-5" />
      </Button>
      <Button
        onClick={() => handleAbsence('absent')}
        variant="secondary"
        className="bg-red-500"
      >
        <Icons.Close className="size-5" />
      </Button>
    </>
  );
};
