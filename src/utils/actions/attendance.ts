'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/utils/supabase/server';

interface SetAppointmentParams {
  studentId: string;
  date: string;
}

interface StudentAppointmentsParams {
  studentId: string;
}

interface GetAppointmentParams {
  poolValue: string;
}

export async function setAppointment(params: SetAppointmentParams) {
  try {
    const supabase = createClient();

    const { studentId, date } = params;

    await supabase.from('attendance_record').insert({
      student_id: studentId,
      type: 'appointment',
      date: date,
      status: 'scheduled',
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAppointments(params: GetAppointmentParams) {
  try {
    const supabase = createClient();

    const { poolValue } = params;

    const { data } = await supabase
      .from('attendance_record')
      .select('*, students(*)')
      .eq('students.pool', poolValue);

    return data || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getStudentActivity(params: StudentAppointmentsParams) {
  try {
    const supabase = createClient();

    const { studentId } = params;

    const { data } = await supabase
      .from('attendance_record')
      .select('*')
      .eq('student_id', studentId);

    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface HandlePresenceProps {
  studentId: string;
  lessonsLeft: number;
  attendance: 'present' | 'absent';
  path: string;
  type?: 'attendance' | 'appointment';
}
export async function updatePresence(params: HandlePresenceProps) {
  try {
    const supabase = createClient();

    const { studentId, lessonsLeft, attendance, path } = params;

    const updateLessonsLeft = '';
    await supabase
      .from('students')
      .update({
        lessons_left:
          attendance === 'present' ? lessonsLeft - 1 : lessonsLeft + 1,
      })
      .eq('id', studentId);

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
