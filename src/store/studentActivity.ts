import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

import { Tables } from '@/types/types_db';

export type Idetails = {
  full_name: string;
  id: string;
  lessons_left: number | null;
  medical_certificate_path: string | null;
  parent_id: string;
  pool: string | null;
  student_phone: string | null;
  swimmer_level: string | null;
} | null;

export type Iactivity = {
  date: string;
  id: string;
  status: 'scheduled' | 'present' | 'absent';
  student_id: string;
  time: string | null;
  type: 'appointment' | 'attendance';
} | null;

interface StudentState {
  studentDetails: Idetails;
  studentActivity: Iactivity;
  setStudentDetails?: (details: Idetails) => void;
  setStudentActivity?: (newActivity: Iactivity) => void;
}

export const useStudent = create<StudentState>()((set) => ({
  studentDetails: null,
  studentActivity: null,
  setStudentDetails: (details) => set(() => ({ studentDetails: details })),
  setStudentActivity: (newActivity) =>
    set((state) => ({ studentActivity: newActivity })),
}));
