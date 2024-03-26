'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import queryString from 'query-string';

import { DashboardTabsProps } from '@/types/types';
import AttendancePanel from './attendance-panel';
import DashboardCalendar from './dashboard-calendar';
import OpenHoursPoolForm from './forms/open-hours-form';
import DashboardFullCalendar from './full-calendar';
import {
  Card,
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
  const poolQuery = searchParams.get('pool');
  const dateQuery = searchParams.get('date');

  const [pool, setPool] = useState(poolQuery || 'cluj-napoca');
  const [date, setDate] = useState(
    dateQuery || format(new Date(), 'yyyy-MM-dd'),
  );
  useEffect(() => {
    const currentParams = queryString.parse(searchParams.toString());

    // Update both 'pool' and 'date' parameters
    const updatedParams = {
      ...currentParams,
      pool: pool,
      date: date,
    };

    // Stringify the updated parameters into a query string
    const queryStringified = queryString.stringify(updatedParams, {
      skipNull: true,
    });

    // Generate the new URL with updated query parameters
    const newUrl = `${window.location.pathname}?${queryStringified}`;

    // Use Next.js router to navigate to the new URL without reloading the page
    router.push(newUrl, { scroll: false });
  }, [pool, date, router, searchParams]);

  return (
    <>
      <Tabs defaultValue={pool} className="space-y-4">
        <CardHeader className="flex-col items-center justify-between md:flex-row">
          <CardTitle>Dashboard</CardTitle>
          <TabsList>
            {pools.map((pool) => (
              <TabsTrigger
                key={pool.id}
                value={pool.name}
                onClick={() => setPool(pool.name)}
                className="capitalize"
              >
                {pool.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </CardHeader>
        <CardContent>
          {pools.map((pool) => (
            <TabsContent key={pool.id} value={pool.name} className="space-y-4">
              <OpenHoursPoolForm openHours={poolOpenHours} />
              {/* <DashboardFullCalendar appointments={appointments} /> */}

              <DashboardCalendar date={date} setDate={setDate} />
              <AttendancePanel students={students} date={date} />
            </TabsContent>
          ))}
        </CardContent>
        <Card>
          <CardHeader>
            <CardTitle>Invite teacher</CardTitle>
          </CardHeader>
        </Card>
      </Tabs>
    </>
  );
};

export default DashboardTabs;
