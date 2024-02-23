'use client';

import { useState } from 'react';
import { type Provider } from '@supabase/supabase-js';

import * as Icons from '@/components/icons';
import { Button } from '@/components/ui';
import { signInWithOAuth } from '@/utils/auth-helpers/client';

type OAuthProviders = {
  name: Provider;
  displayName: string;
  icon: JSX.Element;
};

export default function OauthSignIn() {
  const oAuthProviders: OAuthProviders[] = [
    {
      name: 'github',
      displayName: 'GitHub',
      icon: <Icons.GitHub className="size-5" />,
    },
    {
      name: 'google',
      displayName: 'Google',
      icon: <Icons.Google className="size-5" />,
    },
    /* Add desired OAuth providers here */
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await signInWithOAuth(e);
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="grid gap-2">
        {oAuthProviders.map((provider) => (
          <form key={provider.name} onSubmit={(e) => handleSubmit(e)}>
            <input type="hidden" name="provider" value={provider.name} />
            <Button type="submit" className="w-full">
              {isSubmitting ? (
                <Icons.Spinner className="mr-2 size-5 animate-spin" />
              ) : (
                <span className="mr-2">{provider.icon}</span>
              )}
              <span>{provider.displayName}</span>
            </Button>
          </form>
        ))}
      </div>
    </>
  );
}
