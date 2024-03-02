import React from 'react';
import { redirect } from 'next/navigation';

import RegistrationForm from '@/components/forms/registration-form';
import ProfileTabs from '@/components/profile/profile-tabs-card';
import { Card } from '@/components/ui';
import { URLProps } from '@/types/types';
import { getStudentDetails } from '@/utils/actions/student';
import { getUserDetails } from '@/utils/actions/user';
import { createClient } from '@/utils/supabase/server';

const ProfilePage = async ({ params, searchParams }: URLProps) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userDetails = await getUserDetails({
    userId: params.id,
  });

  const studentDetails = await getStudentDetails({
    studentId: params.id,
  });

  if (!user) redirect('/signin');

  return (
    <div className="flex w-full max-w-screen-lg animate-fade-up flex-col gap-5 p-5 xl:px-0">
      <Card className="shadow-md md:shadow-xl">
        <div className="p-6">
          <RegistrationForm userId={user.id} />
        </div>
        <ProfileTabs
          studentDetails={studentDetails}
          userDetails={userDetails}
        />
      </Card>
    </div>
  );
};

export default ProfilePage;
