'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { DashboardTabsProps } from '@/types/types';
import { formUrlQuery } from '@/utils/urlQuery';
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
      <Tabs defaultValue="cluj-napoca" className="space-y-4">
        <CardHeader className="flex-col items-center justify-between md:flex-row">
          <CardTitle>Dashboard</CardTitle>
          <TabsList>
            {pools.map((pool) => (
              <TabsTrigger
                key={pool.id}
                value={pool.value}
                // onClick={() => setPool(pool.value)}
              >
                {pool.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </CardHeader>
        <CardContent>
          {students &&
            students.map((student) => (
              <p key={student.id}>{student.full_name}</p>
            ))}
          {pools.map((pool) => (
            <TabsContent key={pool.id} value={pool.value} className="space-y-4">
              {/* <CustomCalendar /> */}
              <DashboardFullCalendar events={appointments} />

              {/* <AttendancePanel students={sortedStudents} /> */}
            </TabsContent>
          ))}
        </CardContent>
      </Tabs>
    </>
  );
};

export default DashboardTabs;
