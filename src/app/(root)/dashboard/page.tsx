import React from 'react';

import DashboardTabs from '@/components/dashboard-tabs';
import { Card } from '@/components/ui';
import { Pool, SearchParamsProps } from '@/types/types';
import { getStudents } from '@/utils/actions/students';

const pools: Pool[] = [
  { id: 1, name: 'Cluj-Napoca', value: 'cluj-napoca' },
  { id: 2, name: 'Dej', value: 'dej' },
  { id: 3, name: 'Sancraiu', value: 'sancraiu' },
];

const DashboardPage = async ({ searchParams }: SearchParamsProps) => {
  const students = await getStudents({
    pool: searchParams.pool!,
  });

  return (
    <div className="flex w-full max-w-screen-lg animate-fade-up flex-col gap-5 p-5 xl:px-0">
      <Card>
        <DashboardTabs pools={pools} students={students} />
      </Card>
    </div>
  );
};

export default DashboardPage;
