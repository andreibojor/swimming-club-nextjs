'use client';

import React from 'react';

import * as Icons from '@/components/icons';
import { StudentProfileTabsProps } from '@/types/types';
import { formatCityName, formatDate } from '@/utils/helpers';
import StudentRegistrationForm from '../forms/student-registration-form';
import StudentCalendar from '../shared/calendar';
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
} from '../ui';

const StudentProfileTabs = ({
  studentDetails,
  userDetails,
  studentActivity,
  poolOpenHours,
}: StudentProfileTabsProps) => {
  return (
    <>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Bună, {`${userDetails?.full_name}`}!</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-4 md:flex-row">
          <Card className="w-full md:w-1/3">
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
                      {userDetails?.phone}
                    </p>
                  </div>

                  <div className="flex items-center justify-between space-x-4">
                    <p className="flex items-end text-sm font-medium leading-none">
                      <Icons.Waves className="mr-1 size-4 text-primary" /> Pool:
                    </p>
                    <p className="flex items-end text-sm font-medium leading-none">
                      {studentDetails?.pool &&
                        formatCityName(studentDetails?.pool)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <p className="flex items-end text-sm font-medium leading-none">
                      <Icons.User className="mr-1 size-4 text-primary" /> Role:
                    </p>
                    <p className="flex items-end text-sm font-medium leading-none">
                      {userDetails?.role}
                    </p>
                  </div>
                  {studentDetails?.swimmer_level === 'beginner' && (
                    <div className="flex items-center justify-between space-x-4">
                      <p className="flex items-end text-sm font-medium leading-none">
                        <Icons.Waves className="mr-1 size-4 text-primary" />
                        <span>Lessons left:</span>
                      </p>
                      <p className="flex items-end text-sm font-medium leading-none">
                        {studentDetails?.lessons_left}
                      </p>
                    </div>
                  )}
                  {userDetails?.completed_registration && (
                    <div className="flex items-center justify-between space-x-4">
                      <p className="flex items-end text-sm font-medium leading-none">
                        <Icons.Waves className="mr-1 size-4 text-primary" />{' '}
                        Abonament:
                      </p>
                      <p className="flex items-end text-sm font-medium leading-none">
                        23 data 2024
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {userDetails?.id && (
                <StudentRegistrationForm userDetails={userDetails} />
              )}
            </CardFooter>
          </Card>

          <Card className="w-full md:w-2/3">
            <div className="flex flex-col">
              <StudentCalendar
                studentActivity={studentActivity}
                poolOpenHours={poolOpenHours}
                studentDetails={studentDetails}
              />
            </div>
          </Card>
        </div>
        <div className="flex w-full gap-0 md:gap-4">
          <div className="none md:w-1/3"></div>
          <Card className="w-full md:w-2/3">
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
            {/* <p className="text-gray-500 dark:text-gray-400">
            </p> */}
            {studentActivity &&
              studentActivity.map((appointment) => (
                <h1 key={appointment.id} className="text-2xl font-bold">
                  {formatDate(appointment.date)}
                </h1>
              ))}
          </div>
          <div className="space-y-4"></div>
        </div>
      </div>
    </>
  );
};

export default StudentProfileTabs;
