import React from 'react';

import DashboardTabs from '@/components/dashboard-tabs';
import { Card } from '@/components/ui';
import { SearchParamsProps } from '@/types/types';
import { getAppointments } from '@/utils/actions/attendance';
import { getOpenHoursByPool, getPools } from '@/utils/actions/pool';
import { getStudentsByPool } from '@/utils/actions/student';

const DashboardPage = async ({ searchParams }: SearchParamsProps) => {
  const pools = await getPools();
  const selectedPool = pools.find((pool) => pool.value === searchParams.pool);
  const poolOpenHours = await getOpenHoursByPool({
    poolId: selectedPool?.id!,
  });

  console.log(poolOpenHours);

  const students = await getStudentsByPool({
    pool: searchParams.pool!,
  });

  const appointments = await getAppointments();

  return (
    <div className="flex w-full max-w-screen-lg animate-fade-up flex-col p-5 xl:px-0">
      <Card className="shadow-sm md:shadow-md">
        <DashboardTabs
          pools={pools}
          students={students}
          appointments={appointments}
          poolOpenHours={poolOpenHours}
        />
      </Card>
    </div>
  );
};

export default DashboardPage;
