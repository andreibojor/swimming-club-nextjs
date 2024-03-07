'use server';

import { createClient } from '@/utils/supabase/server';

interface SetAppointmentParams {
  studentId: string;
  date: string;
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

export async function getAppointments() {
  try {
    const supabase = createClient();

    const { data } = await supabase.from('attendance_record').select('*');

    return data || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
