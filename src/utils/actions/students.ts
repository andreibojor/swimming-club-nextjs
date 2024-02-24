'use server';

import { createClient } from '@/utils/supabase/server';

interface GetStudentsParams {
  pool: string;
}

export async function getStudents(params: GetStudentsParams) {
  try {
    const supabase = createClient();

    const { pool } = params;

    const { data } = await supabase
      .from('students')
      .select('*')
      .eq('pool', pool);

    return data || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
