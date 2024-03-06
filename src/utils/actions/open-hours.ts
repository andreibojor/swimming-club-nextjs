'use server';

import { createClient } from '@/utils/supabase/server';

interface GetOpenHoursByPoolParams {
  poolId: string;
}

export async function getOpenHoursByPool(params: GetOpenHoursByPoolParams) {
  try {
    const supabase = createClient();

    const { poolId } = params;

    const { data } = await supabase
      .from('open_hours')
      .select('*')
      .eq('pool_id', poolId);

    return data || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
