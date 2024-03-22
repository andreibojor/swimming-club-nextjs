'use server';

import { revalidatePath } from 'next/cache';

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

interface RegisterUserParams {
  userId: string;
  phoneNumber: string;
  role: string;
  path: string;
}

export async function registerUser(params: RegisterUserParams) {
  try {
    const supabase = createClient();

    const { userId, phoneNumber, role, path } = params;

    await supabase
      .from('users')
      .update({
        phone: phoneNumber,
        role: role,
        completed_registration: true,
      })
      .eq('id', userId);

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
