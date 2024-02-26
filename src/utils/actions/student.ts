'use server';

import { createClient } from '@/utils/supabase/server';

interface GetStudentsParams {
  pool: string;
}

interface GetStudentDetailsParams {
  studentId: string;
}

interface GetStudentsByParentParams {
  parentId: string;
}

export async function getStudentDetails(params: GetStudentDetailsParams) {
  try {
    const supabase = createClient();

    const { studentId } = params;

    const { data } = await supabase
      .from('students')
      .select('*')
      .eq('id', studentId)
      .single();

    return data || null;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getStudentsByPool(params: GetStudentsParams) {
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

export async function getStudentsByParent(params: GetStudentsByParentParams) {
  try {
    const supabase = createClient();

    const { parentId } = params;

    const { data } = await supabase
      .from('students')
      .select('*')
      .eq('parent_id', parentId);

    return data || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
