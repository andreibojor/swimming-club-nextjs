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
  swimmerLevel?: string;
  pool?: string;
  medicalCertificate?: Blob;
  selectedRole?: string;
}

export async function registerUser(params: RegisterUserParams) {
  try {
    const supabase = createClient();

    const {
      userId,
      phoneNumber,
      role,
      swimmerLevel,
      pool,
      medicalCertificate,
      path,
      selectedRole,
    } = params;

    await supabase
      .from('users')
      .update({
        phone: phoneNumber,
        role: role,
        completed_registration: true,
      })
      .eq('id', userId);

    if (selectedRole === 'student') {
      await supabase
        .from('students')
        .update({
          swimmer_level: swimmerLevel,
          pool: pool,
          student_phone: phoneNumber,
          lessons_left: 0,
          medical_certificate_path: `mc-${userId}`,
        })
        .eq('id', userId);

      await supabase.storage
        .from('medical-certificates')
        .upload(`mc-${userId}`, medicalCertificate!, {
          cacheControl: '3600',
          upsert: false,
        });
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
