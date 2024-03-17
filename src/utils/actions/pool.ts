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
  poolId?: string;
}

export async function getOpenHoursByPool(params: GetOpenHoursByPoolParams) {
  try {
    const supabase = createClient();

    const { poolId } = params;

    const { data } = await supabase
      .from('open_hours')
      .select('*')
      .eq('pool_id', poolId)
      .order('dayIndex', { ascending: true });

    return data || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface ChangeOpenHoursParams {
  dayId: string;
  time: string;
  isOpenTime: boolean;
}

export async function changeOpenHours(openHours) {
  try {
    const supabase = createClient();

    const updates = openHours.map((stuff) => {
      return supabase
        .from('open_hours')
        .update({
          open_time: stuff.open_time,
          close_time: stuff.close_time,
        })
        .eq('id', stuff.id);
    });
    await Promise.all(updates);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
