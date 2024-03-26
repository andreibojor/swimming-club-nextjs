'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/utils/supabase/server';

interface SetAppointmentParams {
  studentId: string;
  date: string;
  time: string;
}

export async function setAppointment(params: SetAppointmentParams) {
  try {
    const supabase = createClient();

    const { studentId, date, time } = params;

    await supabase.from('attendance_record').insert({
      student_id: studentId,
      type: 'appointment',
      date: date,
      time: time,
      status: 'scheduled',
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface GetAppointmentParams {
  poolValue: string;
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

interface StudentAppointmentsParams {
  studentId: string;
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
  type?: 'attendance' | 'appointment';
  path: string;
  date: string;
}

export async function updatePresence(params: HandlePresenceProps) {
  try {
    const supabase = createClient();

    const { studentId, lessonsLeft, attendance, path, date } = params;

    const updateLessonsLeft = '';
    await supabase
      .from('students')
      .update({
        lessons_left:
          attendance === 'present' ? lessonsLeft - 1 : lessonsLeft + 1,
      })
      .eq('id', studentId);

    await supabase
      .from('attendance_record')
      .update({
        status: attendance,
      })
      .eq('student_id', studentId)
      .eq('date', date);

    // TODO if student level is advanced or pro, insert record
    // await supabase.from('attendance_record').insert({
    //   student_id: studentId,
    //   date: date,
    //   status: attendance === 'present' ? 'present' : 'absent',
    //   time: null,
    //   type: 'attendance',
    // });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
