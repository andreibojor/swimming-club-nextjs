import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import * as Icons from '@/components/icons';
import { ProfileTabsProps } from '@/types/types';
import { formUrlQuery } from '@/utils/urlQuery';
import StudentCalendar from './calendar';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui';

const ProfileTabs = ({ studentDetails, userDetails }: ProfileTabsProps) => {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const query = searchParams.get('student');

  // useEffect(() => {
  //   const newUrl = formUrlQuery({
  //     params: searchParams.toString(),
  //     key: 'student',
  //     value: pool,
  //   });

  //   router.push(newUrl, { scroll: false });
  // }, [pool, router, searchParams]);

  // console.log(userDetails);
  return (
    <Tabs defaultValue="child1" className="space-y-4">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Bună, {`${userDetails?.full_name}`}!</CardTitle>
        <TabsList>
          <TabsTrigger value="child1">Child 1</TabsTrigger>
          <TabsTrigger value="child2">Child 2</TabsTrigger>
        </TabsList>
      </CardHeader>
      <CardContent>
        <TabsContent value="child1">child1</TabsContent>
        <TabsContent value="child2">child2</TabsContent>
        <div className="mb-4 flex gap-4">
          <Card className="w-1/3">
            <CardHeader>
              <CardTitle>
                <Avatar className="mx-auto h-[80px] w-[80px]">
                  <AvatarImage
                    src={userDetails?.avatar_url || ''}
                    alt={userDetails?.full_name || ''}
                  />
                  {/* // TODO: AvatarFallback sa fie logo-ul de la CSC cu background opus albastru */}
                  <AvatarFallback>CSC</AvatarFallback>
                </Avatar>
              </CardTitle>
            </CardHeader>
            {/* // TODO: Asta e student card!!!  */}
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-6">
                  <div className="flex items-center justify-between space-x-4">
                    <p className="flex items-end text-sm font-medium leading-none">
                      <Icons.Phone className="mr-1 size-4 text-primary" />
                      Phone:
                    </p>
                    <p className="flex items-end text-sm font-medium leading-none">
                      Olivia Martin
                    </p>
                  </div>

                  <div className="flex items-center justify-between space-x-4">
                    <p className="flex items-end text-sm font-medium leading-none">
                      <Icons.Waves className="mr-1 size-4 text-primary" /> Pool:
                    </p>
                    <p className="flex items-end text-sm font-medium leading-none">
                      Olivia Martin
                    </p>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <p className="flex items-end text-sm font-medium leading-none">
                      <Icons.User className="mr-1 size-4 text-primary" /> Role:
                    </p>
                    <p className="flex items-end text-sm font-medium leading-none">
                      Olivia Martin
                    </p>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <p className="flex items-end text-sm font-medium leading-none">
                      <Icons.Waves className="mr-1 size-4 text-primary" />
                      <span>Status:</span>
                    </p>
                    <p className="flex items-end text-sm font-medium leading-none">
                      Olivia Martin
                    </p>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <p className="flex items-end text-sm font-medium leading-none">
                      <Icons.Waves className="mr-1 size-4 text-primary" />{' '}
                      Lessons left:
                    </p>
                    <p className="flex items-end text-sm font-medium leading-none">
                      Olivia Martin
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-2/3">
            <StudentCalendar />
          </Card>
        </div>
        <div className="flex w-full gap-4">
          <div className="none md:w-1/3"></div>
          <Card className="w-2/3">
            <CardHeader>
              <CardTitle>asdasdas</CardTitle>
            </CardHeader>
            <CardContent>asldkasdalkj</CardContent>
          </Card>
        </div>
      </CardContent>
      <div className="p-4">
        <div className="grid items-center justify-center gap-4">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Buy Individual Lessons</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Pay as you go for specific courses
            </p>
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="card-title">Mathematics</h3>
                <p className="card-subtitle">Algebra, Geometry, Calculus</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <p className="text-3xl font-bold">$10</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Per lesson
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Buy Lessons</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="card-title">Science</h3>
                <p className="card-subtitle">Physics, Chemistry, Biology</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <p className="text-3xl font-bold">$10</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Per lesson
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Buy Lessons</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Tabs>
  );
};

export default ProfileTabs;
