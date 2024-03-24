import React from 'react';

import CustomerPortalForm from '@/components/forms/customer-portal-form';
import UserRegistrationForm from '@/components/forms/user-registration-form';
import Pricing from '@/components/pricing';
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
  const pools = await getPools();

  const userDetails = await getUserDetails({
    userId: params.id,
  });

  const studentDetails = await getStudentDetails({
    studentId: params.id,
  });
  // const studentPool = pools.find((pool) => pool.value === studentDetails?.pool);
  // const studentActivity = await getStudentActivity({
  //   studentId: params.id,
  // });

  // const poolOpenHours = await getOpenHoursByPool({
  //   poolId: studentPool?.id!,
  // });

  // // Stripe stuff
  // const subscription = await getSubscriptions();

  // const products = await getProducts({
  //   studentLevel: studentDetails?.swimmer_level!,
  // });

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  if (error) {
    console.log(error);
  }

  const { data: products } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { referencedTable: 'prices' });

  console.log('subscription', subscription);

  return (
    <div className="flex w-full max-w-screen-lg animate-fade-up flex-col gap-5 p-5 xl:px-0">
      <Card className="shadow-sm md:shadow-md">
        {/* {userDetails?.role === 'parent' && (
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
            />
          </>
        )} */}
        <Pricing
          user={user}
          products={products ?? []}
          subscription={subscription}
        />
        <CustomerPortalForm subscription={subscription} />
        {userDetails?.role === null && (
          <UserRegistrationForm userDetails={userDetails} />
        )}
      </Card>
    </div>
  );
};

export default ProfilePage;
