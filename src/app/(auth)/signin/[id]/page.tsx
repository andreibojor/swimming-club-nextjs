import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import ForgotPassword from '@/components/AuthForms/ForgotPassword';
import OauthSignIn from '@/components/AuthForms/OauthSignIn';
import PasswordSignIn from '@/components/AuthForms/PasswordSignIn';
import Separator from '@/components/AuthForms/Separator';
import SignUp from '@/components/AuthForms/Signup';
import UpdatePassword from '@/components/AuthForms/UpdatePassword';
import * as Icons from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import {
  getAuthTypes,
  getDefaultSignInView,
  getRedirectMethod,
  getViewTypes,
} from '@/utils/auth-helpers/settings';
import { createClient } from '@/utils/supabase/server';

export default async function SignIn({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { disable_button: boolean };
}) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
  const viewTypes = getViewTypes();
  const redirectMethod = getRedirectMethod();

  // Declare 'viewProp' and initialize with the default value
  let viewProp: string;

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  if (typeof params.id === 'string' && viewTypes.includes(params.id)) {
    viewProp = params.id;
  } else {
    const preferredSignInView =
      cookies().get('preferredSignInView')?.value || null;
    viewProp = getDefaultSignInView(preferredSignInView);
    return redirect(`/signin/${viewProp}`);
  }

  // Check if the user is already logged in and redirect to the account page if so
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session && viewProp !== 'update_password') {
    return redirect('/');
  } else if (!session && viewProp === 'update_password') {
    return redirect('/signin');
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex justify-center md:hidden">
        <Icons.Logo width="64px" height="64px" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-center">
            {viewProp === 'forgot_password'
              ? 'Reset Password'
              : viewProp === 'update_password'
                ? 'Update Password'
                : viewProp === 'signup'
                  ? 'Sign Up'
                  : 'Sign In'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {viewProp === 'password_signin' && (
            <PasswordSignIn
              allowEmail={allowEmail}
              redirectMethod={redirectMethod}
            />
          )}
          {viewProp === 'forgot_password' && (
            <ForgotPassword
              allowEmail={allowEmail}
              redirectMethod={redirectMethod}
            />
          )}
          {viewProp === 'update_password' && (
            <UpdatePassword redirectMethod={redirectMethod} />
          )}
          {viewProp === 'signup' && (
            <SignUp allowEmail={allowEmail} redirectMethod={redirectMethod} />
          )}
          {viewProp !== 'update_password' &&
            viewProp !== 'signup' &&
            allowOauth && (
              <div className="mt-6 flex flex-col gap-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <OauthSignIn />
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
