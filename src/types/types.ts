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

export interface DashboardTabsProps {
  pools: Pool[];
}
