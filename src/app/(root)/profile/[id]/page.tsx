import React from 'react';
import { redirect } from 'next/navigation';

import CustomerPortalForm from '@/components/forms/customer-portal-form';
import UserRegistrationForm from '@/components/forms/user-registration-form';
import Pricing from '@/components/pricing-parent';
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
import { createClient } from '@/utils/supabase/server';

const ProfilePage = async ({ params, searchParams }: URLProps) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/signin');
  }

  const userDetails = await getUserDetails({
    userId: user.id,
  });

  const studentDetails = await getStudentDetails({
    studentId: params.id,
  });

  const studentActivity = await getStudentActivity({
    studentId: params.id,
  });

  const poolOpenHours = await getOpenHoursByPool({
    poolId: studentDetails.pool.id,
  });

  // Stripe stuff
  const subscription = await getSubscriptions();
  const products = await getProducts({
    studentLevel: studentDetails?.swimmer_level!,
  });

  return (
    <div className="flex w-full max-w-screen-lg animate-fade-up flex-col gap-5 p-5 xl:px-0">
      <Card className="shadow-sm md:shadow-md">
        {userDetails?.role === 'parent' && (
          <ParentProfileTabs
            studentDetails={studentDetails}
            userDetails={userDetails}
          />
        )}

        {userDetails?.role === 'student' && (
          <>
            <StudentProfileTabs
              studentDetails={studentDetails}
              userDetails={userDetails}
              studentActivity={studentActivity}
              poolOpenHours={poolOpenHours}
              // for stripe
              user={user}
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
