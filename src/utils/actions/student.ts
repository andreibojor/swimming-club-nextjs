// @ts-nocheck
'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/utils/supabase/server';
import { convertBase64ToBlob } from '../helpers';

interface GetStudentsParams {
  pool: string;
}

interface GetStudentDetailsParams {
  studentId: string;
}

interface GetStudentsByParentParams {
  parentId: string;
}

interface RegisterStudentParams {
  userId: string;
  role: string;
  phoneNumber: string;
  swimmerLevel: string;
  pool: string;
  medicalCertificate: string;
  path: string;
}

interface UpdateStudentLessonsParams {
  studentId: string;
  quantity: number;
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

export async function registerStudent(params: RegisterStudentParams) {
  try {
    const supabase = createClient();
    const {
      userId,
      role,
      phoneNumber,
      swimmerLevel,
      pool,
      medicalCertificate,
      path,
    } = params;

    // Convert the medicalCertificate base64-encoded string back to a Blob
    const medicalCertificateBlob = convertBase64ToBlob(medicalCertificate);

    await supabase
      .from('users')
      .update({
        phone: phoneNumber,
        role: role,
        completed_registration: true,
      })
      .eq('id', userId);

    await supabase
      .from('students')
      .update({
        swimmer_level: swimmerLevel,
        pool: pool,
        student_phone: phoneNumber,
        medical_certificate_path: `mc-${userId}`,
      })
      .eq('id', userId);

    await supabase.storage
      .from('medical-certificates')
      .upload(`mc-${userId}`, medicalCertificateBlob, {
        cacheControl: '3600',
        upsert: false,
      });

    revalidatePath(path);
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export async function updateStudentLessons(params: UpdateStudentLessonsParams) {
  try {
    const supabase = createClient();

    const { studentId, quantity } = params;

    // Retrieve the student data
    const { data: student, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', studentId)
      .single();

    if (error) {
      throw error;
    }

    if (!student) {
      throw new Error('Student not found');
    }

    // Calculate new lessons left
    const updatedLessonsLeft = student.lessons_left + quantity;

    await supabase
      .from('students')
      .update({ lessons_left: updatedLessonsLeft })
      .eq('id', studentId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
