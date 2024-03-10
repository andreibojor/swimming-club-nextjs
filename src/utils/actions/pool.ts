'use server';

import { createClient } from '@/utils/supabase/server';

export async function getPools() {
  try {
    const supabase = createClient();

    const { data } = await supabase.from('pools').select('*');
    console.log(data);
    return data || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
