'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { DashboardTabsProps } from '@/types/types';
import { formUrlQuery } from '@/utils/urlQuery';
import AttendancePanel from './attendance-panel';
import OpenHoursPoolForm from './forms/open-hours-form';
import DashboardFullCalendar from './full-calendar';
import {
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui';

const DashboardTabs = ({
  pools,
  students,
  appointments,
  poolOpenHours,
}: DashboardTabsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('pool');

  const [pool, setPool] = useState(query || 'cluj-napoca');

  useEffect(() => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'pool',
      value: pool,
    });

    router.push(newUrl, { scroll: false });
  }, [pool, router, searchParams]);

  return (
    <>
      <Tabs defaultValue={pool} className="space-y-4">
        <CardHeader className="flex-col items-center justify-between md:flex-row">
          <CardTitle>Dashboard</CardTitle>
          <TabsList>
            {pools.map((pool) => (
              <TabsTrigger
                key={pool.id}
                value={pool.value}
                onClick={() => setPool(pool.value)}
              >
                {pool.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </CardHeader>
        <CardContent>
          {pools.map((pool) => (
            <TabsContent key={pool.id} value={pool.value} className="space-y-4">
              <OpenHoursPoolForm openHours={poolOpenHours} />
              {/* <DashboardFullCalendar appointments={appointments} /> */}
              {/* <AttendancePanel students={sortedStudents} /> */}
              <AttendancePanel students={students} />
            </TabsContent>
          ))}
        </CardContent>
      </Tabs>
    </>
  );
};

export default DashboardTabs;
