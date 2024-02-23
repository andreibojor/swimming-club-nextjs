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
  const { data } = await getStudents({
    pool: searchParams.pool,
  });

  return (
    <div className="flex w-full max-w-screen-lg animate-fade-up flex-col gap-5 p-5 xl:px-0">
      <div className="flex flex-col justify-between gap-5">
        <div className="flex flex-col justify-normal gap-4 md:flex-row md:justify-between">
          <Card className="w-full md:w-3/5">
            <DashboardTabs pools={pools} students={data} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
