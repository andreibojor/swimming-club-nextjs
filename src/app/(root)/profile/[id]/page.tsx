import React from 'react';

import UserRegistrationForm from '@/components/forms/user-registration-form';
import ParentProfileTabs from '@/components/profile/parent-profile-tabs';
import StudentProfileTabs from '@/components/profile/student-profile-tabs';
import { Card } from '@/components/ui';
import { URLProps } from '@/types/types';
import { getStudentActivity } from '@/utils/actions/attendance';
import { getOpenHoursByPool, getPools } from '@/utils/actions/pool';
import {
  getProducts,
  getSubscriptions,
} from '@/utils/actions/products-and-prices';
import { getStudentDetails } from '@/utils/actions/student';
import { getUserDetails } from '@/utils/actions/user';

const ProfilePage = async ({ params, searchParams }: URLProps) => {
  const pools = await getPools();

  const userDetails = await getUserDetails({
    userId: params.id,
  });

  const studentDetails = await getStudentDetails({
    studentId: params.id,
  });
  const studentPool = pools.find((pool) => pool.value === studentDetails?.pool);
  const studentActivity = await getStudentActivity({
    studentId: params.id,
  });

  const poolOpenHours = await getOpenHoursByPool({
    poolId: studentPool?.id!,
  });

  // Stripe stuff
  const subscription = await getSubscriptions();

  const products = await getProducts({
    studentLevel: studentDetails?.swimmer_level!,
  });

  console.log('subscription', subscription);

  return (
    <div className="flex w-full max-w-screen-lg animate-fade-up flex-col gap-5 p-5 xl:px-0">
      <Card className="shadow-sm md:shadow-md">
        {userDetails?.role === 'parent' && (
          // <ParentProfileTabs
          //   studentDetails={studentDetails}
          //   userDetails={userDetails}
          // />
          <h1>you are on a parent page</h1>
        )}

        {userDetails?.role === 'student' && (
          <>
            <StudentProfileTabs
              studentDetails={studentDetails}
              userDetails={userDetails}
              studentActivity={studentActivity}
              poolOpenHours={poolOpenHours}
              // for stripe
              user={userDetails.id}
              products={products ?? []}
              subscription={subscription}
            />
          </>
        )}

        {userDetails?.role === null && (
          <UserRegistrationForm userDetails={userDetails} />
        )}
      </Card>
    </div>
  );
};

export default ProfilePage;
