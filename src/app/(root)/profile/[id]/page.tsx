import React from 'react';

import { createClient } from '@/utils/supabase/server';

const ProfilePage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <div></div>;
};

export default ProfilePage;
