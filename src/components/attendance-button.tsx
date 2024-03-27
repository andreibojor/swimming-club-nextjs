'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { format } from 'date-fns';
import { toast } from 'sonner';

import * as Icons from '@/components/icons';
import { Button } from '@/components/ui';
import { useStudent } from '@/store/studentActivity';
import { Tables } from '@/types/types_db';
import { updateAbsence, updatePresence } from '@/utils/actions/attendance';
import { createClient } from '@/utils/supabase/client';

interface Props {
  student: Tables<'students'>;
  date: Date;
}
export const AttendanceButton = ({ student, date }: Props) => {
  const pathname = usePathname();

  const [matchingRecord, setMatchingRecord] = useState(
    student.attendance_record?.find((record) => record.date === date) || {},
  );
  const supabase = createClient();
  useEffect(() => {
    const changes = supabase
      .channel(`attendance_record_channel`)
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
          }
        },
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'attenandce_record',
        },
        async (payload) => {
          const { data, error } = await supabase
            .from('attendance_record')
            .select('*')
            .match({ student_id: payload.new.id, date: date })
            .single();
          if (error) {
            toast.error(error.message);
          } else {
            setStudentActivity(payload.new);
          }
        },
      )
      .subscribe();

    return () => {
      changes.unsubscribe();
    };
  }, [date, student.id]);

  const handlePresence = async () => {
    try {
      await updatePresence({
        studentId: student.id,
        lessonsLeft: student.lessons_left,
        date: format(date, 'yyyy-MM-dd'),
        attendance: 'present',
        path: pathname,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleAbsence = async () => {
    try {
      await updateAbsence({
        studentId: student.id,
        lessonsLeft: student.lessons_left,
        date: format(date, 'yyyy-MM-dd'),
        attendance: 'absent',
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
        onClick={() => {
          if (matchingRecord && matchingRecord.status !== 'present') {
            handlePresence();
          } else {
            // Optionally, you can provide feedback to the user here that the student is already marked as present
            console.log('Student is already marked as present');
          }
        }}
        variant="secondary"
        className={matchingRecord.status === 'present' ? 'bg-green-800' : ''}
      >
        <Icons.Check className="size-5" />
      </Button>
      <Button
        onClick={() => {
          if (matchingRecord && matchingRecord.status !== 'absent') {
            handleAbsence();
          } else {
            // Optionally, you can provide feedback to the user here that the student is already marked as present
            console.log('Student is already marked as present');
          }
        }}
        variant="secondary"
        className={matchingRecord.status === 'absent' ? 'bg-red-500' : ''}
      >
        <Icons.Close className="size-5" />
      </Button>
    </>
  );
};
