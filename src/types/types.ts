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

// PAGE     PROPS //

export interface DashboardTabsProps {
  pools: Pool[];
}

// DATABASE TYPES //

export interface Student {
  id: string;
  avatar_url: string;
  full_name: string;
  lessons_left: number;
  medical_certificate_path: string;
  parent_id: string;
  pool: string;
  student_phone: string;
  swimmer_level: string;
}
