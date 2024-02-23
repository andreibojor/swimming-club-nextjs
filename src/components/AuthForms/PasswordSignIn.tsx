'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import * as Icons from '@/components/icons';
import { Button, Input } from '@/components/ui';
import { handleRequest } from '@/utils/auth-helpers/client';
import { signInWithPassword } from '@/utils/auth-helpers/server';

// Define prop type with allowEmail boolean
interface PasswordSignInProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function PasswordSignIn({
  allowEmail,
  redirectMethod,
}: PasswordSignInProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signInWithPassword, router);
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
      <p>
        <Link href="/signin/forgot_password" className="text-sm font-light">
          Forgot your password?
        </Link>
      </p>

      <p>
        <Link href="/signin/signup" className="text-sm font-light">
          Don&apos;t have an account? Sign up
        </Link>
      </p>
    </>
  );
}
