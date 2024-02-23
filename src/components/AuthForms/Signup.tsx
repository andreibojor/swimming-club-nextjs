'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import * as Icons from '@/components/icons';
import { Button, Input } from '@/components/ui';
import { handleRequest } from '@/utils/auth-helpers/client';
import { signUp } from '@/utils/auth-helpers/server';

// Define prop type with allowEmail boolean
interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signUp, router);
    setIsSubmitting(false);
  };

  return (
    <>
      <form noValidate={true} onSubmit={(e) => handleSubmit(e)}>
        <div className="grid gap-2">
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            name="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            className="w-full rounded-md"
          />

          <Input
            id="password"
            placeholder="password"
            type="password"
            name="password"
            autoComplete="current-password"
            className="w-full rounded-md"
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <Icons.Spinner className="mr-2 size-4 animate-spin" />
            )}
            Sign in
          </Button>
        </div>
      </form>
      <p>Already have an account?</p>
      <p>
        <Link href="/signin/password_signin" className="text-sm font-light">
          Sign in with email and password
        </Link>
      </p>
    </>
  );
}
