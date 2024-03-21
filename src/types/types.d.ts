import { User } from '@supabase/supabase-js';

import { Tables } from './types_db';

export interface ParamsProps {
  params: { id: string };
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export interface Pool {
  id: number;
  name: string;
  value: string;
}

// DATABASE TYPES //

// PAGE     PROPS //

export interface DashboardTabsProps {
  pools: Tables<'pools'>[];
  students: Tables<'students'>[];
  appointments: Tables<'attendance_record'>[];
  poolOpenHours: Tables<'open_hours'>[];
}

export interface ParentProfileTabsProps {
  studentDetails: Tables<'students'> | null;
  userDetails: Tables<'users'> | null;
}

export interface StudentProfileTabsProps {
  studentDetails: Tables<'students'> | null;
  userDetails: Tables<'users'> | null;
  studentActivity: Tables<'attendance_record'>[];
  poolOpenHours: Tables<'open_hours'>[];
  user: User;
  products: Tables<'products'>[];
  subscription: Tables<'subscriptions'>[];
}

export interface StudentCalendarProps {
  studentActivity: Tables<'attendance_record'>[];
}
