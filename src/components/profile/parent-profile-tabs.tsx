import React from 'react';

import * as Icons from '@/components/icons';
import { ParentProfileTabsProps } from '@/types/types';
import ScheduleLessonForm from '../forms/schedule-lesson-form';
import RegistrationForm from '../forms/student-registration-form';
import StudentCalendar from '../shared/student-calendar';
import { DateTimePickerDemo } from '../time-picker/date-time-picker-demo';
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
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../ui';

const ParentProfileTabs = ({
  studentDetails,
  userDetails,
}: ParentProfileTabsProps) => {
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

  return (
    <Tabs defaultValue="child1" className="space-y-4">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Bună, {`${userDetails?.full_name}`}!</CardTitle>
        <TabsList>
          <TabsTrigger value="child1">Child 1</TabsTrigger>
          <TabsTrigger value="child2">Child 2</TabsTrigger>
          <TabsTrigger value="child3">+</TabsTrigger>
        </TabsList>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-4">
          <Card className="w-1/3">
            <CardHeader>
              <CardTitle>
                <Avatar className="mx-auto h-[80px] w-[80px]">
                  <AvatarImage
                    src={userDetails?.avatar_url || ''}
                    alt={userDetails?.full_name || ''}
                  />

                  <AvatarFallback className="bg-primary text-primary-foreground">
                    CSC
                  </AvatarFallback>
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
                      Oli Marti
                    </p>
                  </div>

                  <div className="flex items-center justify-between space-x-4">
                    <p className="flex items-end text-sm font-medium leading-none">
                      <Icons.Waves className="mr-1 size-4 text-primary" /> Pool:
                    </p>
                    <p className="flex items-end text-sm font-medium leading-none">
                      Oli Marti
                    </p>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <p className="flex items-end text-sm font-medium leading-none">
                      <Icons.User className="mr-1 size-4 text-primary" /> Role:
                    </p>
                    <p className="flex items-end text-sm font-medium leading-none">
                      Oli Marti
                    </p>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <p className="flex items-end text-sm font-medium leading-none">
                      <Icons.Waves className="mr-1 size-4 text-primary" />
                      <span>Status:</span>
                    </p>
                    <p className="flex items-end text-sm font-medium leading-none">
                      Oli Marti
                    </p>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <p className="flex items-end text-sm font-medium leading-none">
                      <Icons.Waves className="mr-1 size-4 text-primary" />{' '}
                      Lessons left:
                    </p>
                    <p className="flex items-end text-sm font-medium leading-none">
                      Oli Marti
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {userDetails?.id && (
                <RegistrationForm userDetails={userDetails} />
              )}
            </CardFooter>
          </Card>

          <Card className="w-2/3">
            <TabsContent value="child2">child2</TabsContent>
            <TabsContent value="child1" className="flex justify-between">
              <div className="flex flex-col">
                {/* <StudentCalendar /> */}
                <DateTimePickerDemo studentId={userDetails!.id} />
              </div>
              <Card className="border-none">
                <CardHeader className="pb-4 pt-3">
                  <CardTitle className="text-center">child 1</CardTitle>
                </CardHeader>
                {/* // TODO: Asta e student card!!!  */}
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-6">
                      <div className="flex items-center justify-between space-x-4">
                        <p className="flex items-end text-sm font-medium leading-none">
                          <Icons.Phone className="mr-1 size-4 text-primary" />
                          Nume:
                        </p>
                        <p className="flex items-end text-sm font-medium leading-none">
                          Oli Marti
                        </p>
                      </div>
                      <div className="flex items-center justify-between space-x-4">
                        <p className="flex items-end text-sm font-medium leading-none">
                          <Icons.Phone className="mr-1 size-4 text-primary" />
                          Phone:
                        </p>
                        <p className="flex items-end text-sm font-medium leading-none">
                          Oli Marti
                        </p>
                      </div>

                      <div className="flex items-center justify-between space-x-4">
                        <p className="flex items-end text-sm font-medium leading-none">
                          <Icons.Waves className="mr-1 size-4 text-primary" />{' '}
                          Pool:
                        </p>
                        <p className="flex items-end text-sm font-medium leading-none">
                          Oli Marti
                        </p>
                      </div>
                      <div className="flex items-center justify-between space-x-4">
                        <p className="flex items-end text-sm font-medium leading-none">
                          <Icons.User className="mr-1 size-4 text-primary" />{' '}
                          Swimmer Level:
                        </p>
                        <p className="flex items-end text-sm font-medium leading-none">
                          Oli Marti
                        </p>
                      </div>
                      <div className="flex items-center justify-between space-x-4">
                        <p className="flex items-end text-sm font-medium leading-none">
                          <Icons.Waves className="mr-1 size-4 text-primary" />
                          <span>Status:</span>
                        </p>
                        <p className="flex items-end text-sm font-medium leading-none">
                          Oli Marti
                        </p>
                      </div>
                      <div className="flex items-center justify-between space-x-4">
                        <p className="flex items-end text-sm font-medium leading-none">
                          <Icons.Waves className="mr-1 size-4 text-primary" />{' '}
                          Lessons left:
                        </p>
                        <p className="flex items-end text-sm font-medium leading-none">
                          Oli Marti
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Card>
        </div>
        <div className="flex w-full gap-4">
          <div className="none md:w-1/3"></div>
          <Card className="w-2/3">
            <CardHeader>
              <CardTitle>Access</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <p className="text-3xl font-bold">$10</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Per month
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Buy Subscription</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Individual Lessons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <p className="text-3xl font-bold">$10</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Per lesson
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Input type="text" />
                  <Button>Buy Lessons</Button>
                </CardFooter>
              </Card>
            </CardContent>
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
          <div className="space-y-4"></div>
        </div>
      </div>
    </Tabs>
  );
};

export default ParentProfileTabs;
