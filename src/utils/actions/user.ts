'use server';

import { createClient } from '@/utils/supabase/server';

interface GetUserDetailsParams {
  userId: string;
}

export async function getUserDetails(params: GetUserDetailsParams) {
  try {
    const supabase = createClient();

    const { userId } = params;

    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    return data || null;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
