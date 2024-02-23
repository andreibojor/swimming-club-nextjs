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

export interface Student {
  id: string | null;
  avatar_url: string | null;
  full_name: string | null;
  lessons_left: number | null;
  medical_certificate_path: string | null;
  parent_id: string | null;
  pool: string | null;
  student_phone: string | null;
  swimmer_level: string | null;
}

// PAGE     PROPS //

export interface DashboardTabsProps {
  pools: Pool[];
  students: any;
}
