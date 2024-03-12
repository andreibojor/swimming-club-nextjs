'use server';

import { createClient } from '@/utils/supabase/server';

export async function getPools() {
  try {
    const supabase = createClient();

    const { data } = await supabase.from('pools').select('*');

    return data || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

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
    console.log(data);
    return data || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
