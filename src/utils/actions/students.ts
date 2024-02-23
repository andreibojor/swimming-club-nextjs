'use server';

import { createClient } from '@/utils/supabase/server';

export async function getStudents() {
  try {
    const supabase = createClient();

    const data = await supabase.from('students').select('*');

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
