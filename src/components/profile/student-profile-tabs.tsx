'use client';

import React from 'react';

import StudentRegistrationForm from '@/components/forms/student-registration-form';
import * as Icons from '@/components/icons';
import StudentCalendar from '@/components/shared/student-calendar';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { StudentProfileTabsProps } from '@/types/types';
import CustomerPortalForm from '../forms/customer-portal-form';
import PricingStudent from '../pricing-student';

const StudentProfileTabs = ({
  studentDetails,
  userDetails,
  studentActivity,
  poolOpenHours,
  user,
  products,
  subscription,
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
                      Telefon:
                    </p>
                    <p className="flex items-end text-sm font-medium leading-none">
                      {userDetails?.phone}
                    </p>
                  </div>

                  <div className="flex items-center justify-between space-x-4">
                    <p className="flex items-end text-sm font-medium leading-none">
                      <Icons.Waves className="mr-1 size-4 text-primary" />
                      Bazin:
                    </p>
                    <p className="flex items-end text-sm font-medium capitalize leading-none">
                      {studentDetails.pool.name}
                    </p>
                  </div>
                  {studentDetails?.swimmer_level === 'beginner' && (
                    <div className="flex items-center justify-between space-x-4">
                      <p className="flex items-end text-sm font-medium leading-none">
                        <Icons.Waves className="mr-1 size-4 text-primary" />
                        <span>Ședințe rămase:</span>
                      </p>
                      <p className="flex items-end text-sm font-medium leading-none">
                        {studentDetails?.lessons_left}
                      </p>
                    </div>
                  )}
                  {userDetails?.completed_registration && (
                    <div className="flex items-center justify-between space-x-4">
                      <p className="flex items-end text-sm font-medium leading-none">
                        <Icons.Waves className="mr-1 size-4 text-primary" />
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

        <PricingStudent
          user={user}
          products={products ?? []}
          subscription={subscription}
          swimmerLevel={studentDetails?.swimmer_level ?? ''}
        />
        <CustomerPortalForm subscription={subscription} />
      </CardContent>
    </>
  );
};

export default StudentProfileTabs;
