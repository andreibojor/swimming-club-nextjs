'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import * as Icons from '@/components/icons';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { createClient } from '@/utils/supabase/client';

interface Props {
  type?: 'create' | 'edit';
  userId: string;
  questionDetails?: string;
}

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
];

const RegistrationSchema = z.object({
  role: z.string(),
  phoneNumber: z.string().regex(phoneRegex, 'Invalid Number!'),
  swimmerLevel: z.string(),
  pool: z.string(),
  medicalCertificate: z
    .instanceof(Blob, { message: 'Medical Certificate is required' })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      'File size should be less than 5 MB.',
    )
    .refine(
      (file) => ALLOWED_FILE_TYPES.includes(file.type),
      'Only .pdf files are allowed',
    ),
});

const RegistrationForm = ({ userId, questionDetails }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 1. Define your form.
  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      role: '',
      swimmerLevel: '',
      pool: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof RegistrationSchema>) {
    setIsSubmitting(true);
    const selectedRole = form.watch('role');

    try {
      const supabase = createClient();
      const { role, phoneNumber, swimmerLevel, pool, medicalCertificate } =
        values;

      await supabase
        .from('users')
        .update({
          phone: phoneNumber,
          role: role,
          completed_registration: true,
        })
        .eq('id', userId);

      await supabase.storage
        .from('medical-certificates')
        .upload(`mc-${userId}`, medicalCertificate, {
          cacheControl: '3600',
          upsert: false,
        });
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select your role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your user role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormDescription>Select the desired payment method.</FormDescription>

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="0751123456" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="swimmerLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Performance Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the level of your performance" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="pro">Performance</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can request your swimming teacher to promote you
                {/* <Link href="/examples/forms">email settings</Link>. */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pool"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pool Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the level of your performance" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="cluj-napoca">Cluj-Napoca</SelectItem>
                  <SelectItem value="dej">Dej</SelectItem>
                  <SelectItem value="sancraiu">Sâncraiu</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can request your swimming teacher to promote you
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch('role') === 'student' && (
          <FormField
            control={form.control}
            name="medicalCertificate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medical Certificate</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf"
                    placeholder="MedicalCertificate.pdf"
                    // Use event.target.files to access the uploaded file
                    onChange={(e) => {
                      // Update the form state with the selected file
                      field.onChange(e.target.files?.[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Please upload your medical certificate in .pdf format.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && (
            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign in
        </Button>
      </form>
    </Form>
  );
};

export default RegistrationForm;
