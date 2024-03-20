import React from 'react';

import DashboardTabs from '@/components/dashboard-tabs';
import DashboardFullCalendar from '@/components/full-calendar';
import { Card } from '@/components/ui';
import { SearchParamsProps } from '@/types/types';
import { getAppointments } from '@/utils/actions/attendance';
import { getOpenHoursByPool, getPools } from '@/utils/actions/pool';
import { getStudentsByPool } from '@/utils/actions/student';

const DashboardPage = async ({ searchParams }: SearchParamsProps) => {
  const pools = await getPools();
  const selectedPool = pools.find((pool) => pool.value === searchParams.pool);
  const poolOpenHours = await getOpenHoursByPool({
    poolId: selectedPool?.id,
  });

  const students = await getStudentsByPool({
    pool: searchParams.pool!,
  });

  const appointments = await getAppointments();

  // const [pools, selectedPool, poolOpenHours, students, appointments] =
  //   await Promise.all([
  //     getPools(),
  //     getPools().then((pools) =>
  //       pools.find((pool) => pool.value === searchParams.pool),
  //     ),
  //     getPools().then((pools) => {
  //       const selectedPool = pools.find(
  //         (pool) => pool.value === searchParams.pool,
  //       );
  //       return selectedPool
  //         ? getOpenHoursByPool({ poolId: selectedPool.id })
  //         : null;
  //     }),
  //     getStudentsByPool({ pool: searchParams.pool }),
  //     getAppointments(),
  //   ]);

  return (
    <div className="m-3 flex w-full max-w-screen-lg animate-fade-up flex-col p-5 xl:px-0">
      <div className="m-4">asds</div>
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
