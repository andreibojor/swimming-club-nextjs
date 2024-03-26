'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

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
import { useStudent } from '@/store/studentActivity';
import { Tables } from '@/types/types_db';
import { createClient } from '@/utils/supabase/client';
import { AttendanceButton } from './attendance-button';
import SwimmerCard from './swimmer-card';

interface Props {
  student: Tables<'students'>;
}
export function AttendanceCard({ student, date }: Props) {
  const getInitials = (name: string) => {
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('');

    return initials;
  };
  const {
    studentDetails,
    studentActivity,
    setStudentDetails,
    setStudentActivity,
  } = useStudent((state) => state);
  useEffect(() => {
    console.log(
      `studentDetails ${studentDetails?.full_name} updated:`,
      studentDetails,
    );
  }, [studentDetails]);

  useEffect(() => {
    console.log(`studentActivity updated:`, studentActivity);
  }, [studentActivity]);
  const supabase = createClient();

  useEffect(() => {
    const changes = supabase
      .channel('attendance_record_changes')
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
            console.log(payload.new);
            setStudentDetails(payload.new);
            console.log('studentDetails', studentDetails);
            toast.info(`${payload.new.full_name}, ${payload.new.lessons_left}`);
          }
        },
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'attendance_record',
        },
        async (payload) => {
          const { data, error } = await supabase
            .from('attendance_record')
            .select('*')
            .match({ student_id: payload.new.student_id, date: date })
            .single();

          if (error) {
            toast.error(error.message);
          } else {
            setStudentActivity(payload.new);
            console.log('studentActivity:', studentActivity);
            toast.info(` for ${payload.new.status}`);
          }
        },
      )
      .subscribe();

    return () => {
      changes.unsubscribe();
    };
  }, [date, supabase]);

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
                <p className="text-sm font-medium">
                  {studentDetails?.lessons_left}
                </p>
              </>
            )}
          </div>
        </SwimmerCard>
        <AttendanceButton
          student={student}
          date={date}
          studentActivity={studentActivity}
        />

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
