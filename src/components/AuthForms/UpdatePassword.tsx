'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import * as Icons from '@/components/icons';
import { Button, Input } from '@/components/ui';
import { handleRequest } from '@/utils/auth-helpers/client';
import { updatePassword } from '@/utils/auth-helpers/server';

interface UpdatePasswordProps {
  redirectMethod: string;
}

export default function UpdatePassword({
  redirectMethod,
}: UpdatePasswordProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, updatePassword, router);
    setIsSubmitting(false);
  };

  return (
    <>
      <form noValidate={true} onSubmit={(e) => handleSubmit(e)}>
        <div className="grid gap-2">
          <Input
            id="password"
            placeholder="password"
            type="password"
            name="password"
            autoComplete="current-password"
            className="w-full rounded-md"
          />

          <Input
            id="passwordConfirm"
            placeholder="confirm new password"
            type="password"
            name="passwordConfirm"
            autoComplete="current-password"
            className="w-full rounded-md"
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <Icons.Spinner className="mr-2 size-4 animate-spin" />
            )}
            Update Password
          </Button>
        </div>
      </form>
    </>
  );
}
