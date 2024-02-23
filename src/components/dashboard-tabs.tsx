'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { DashboardTabsProps } from '@/types/types';
import { formUrlQuery } from '@/utils/urlQuery';
import {
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui';

const DashboardTabs = ({ pools }: DashboardTabsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('pool');

  const [pool, setPool] = useState(query || 'cluj-napoca');

  // useEffect(() => {
  //   const newUrl = formUrlQuery({
  //     params: searchParams.toString(),
  //     key: 'pool',
  //     value: pool,
  //   });

  //   router.push(newUrl, { scroll: false });
  // }, [pool, router, searchParams]);

  return (
    <Tabs defaultValue="cluj-napoca" className="space-y-4">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
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
            <div className="flex flex-col justify-between md:flex-row">
              {/* <CustomCalendar /> */}
            </div>
            <h1>{pool.name}</h1>
            {/* <AttendancePanel students={sortedStudents} /> */}
          </TabsContent>
        ))}
      </CardContent>
    </Tabs>
  );
};

export default DashboardTabs;
