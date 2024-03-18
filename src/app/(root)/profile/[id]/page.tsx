import React from 'react';
import { redirect } from 'next/navigation';

import RegistrationForm from '@/components/forms/student-registration-form';
import ParentProfileTabs from '@/components/profile/parent-profile-tabs';
import StudentProfileTabs from '@/components/profile/student-profile-tabs';
import { Card, Input } from '@/components/ui';
import { URLProps } from '@/types/types';
import { getStudentActivity } from '@/utils/actions/attendance';
import { getOpenHoursByPool, getPools } from '@/utils/actions/pool';
import { getStudentDetails } from '@/utils/actions/student';
import { getUserDetails } from '@/utils/actions/user';
import { createClient } from '@/utils/supabase/server';

const ProfilePage = async ({ params, searchParams }: URLProps) => {
  const supabase = createClient();
  const pools = await getPools();

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    poolId: studentPool?.id,
  });

  console.log(poolOpenHours);

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
          <StudentProfileTabs
            studentDetails={studentDetails}
            userDetails={userDetails}
            studentActivity={studentActivity}
            poolOpenHours={poolOpenHours}
          />
        )}
      </Card>
    </div>
  );
};

export default ProfilePage;
