// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import * as Icons from '@/components/icons';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/constants';
import { Json } from '@/types/types_db';
import { registerStudent } from '@/utils/actions/student';
import { registerUser } from '@/utils/actions/user';

interface Props {
  type?: 'create' | 'edit';
  userDetails: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    billing_address: Json;
    payment_method: Json;
    role: string | null;
    phone: string | null;
    completed_registration: boolean;
    email: string | null;
  };
}

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const UserRegistrationSchema = z.object({
  role: z.string(),
  phoneNumber: z.string().regex(phoneRegex, 'Invalid Number!'),
  swimmerLevel: z.string(),
  pool: z.string(),
});

const UserRegistrationForm = ({ userDetails }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserRegistrationSchema>>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      role: '',
      phoneNumber: '',
      swimmerLevel: '',
      pool: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserRegistrationSchema>) {
    setIsSubmitting(true);
    const selectedRole = form.watch('role');
    const { phoneNumber, swimmerLevel, pool, medicalCertificate, role } =
      values;

    try {
      await registerUser({
        userId: userDetails.id,
        phoneNumber: phoneNumber,
        role: role,
        swimmerLevel: swimmerLevel,
        pool: pool,
        medicalCertificate: medicalCertificate,
        path: pathname,
        selectedRole: selectedRole,
      });

      toast.success('Event has been created');
    } catch (error) {
      console.error('Caught error:', error);
      throw Error;
    } finally {
      setIsSubmitting(false);
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Complete Registration</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" grid space-y-8"
          >
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select your role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
            {form.watch('role') === 'student' && (
              <>
                <FormField
                  control={form.control}
                  name="swimmerLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Performance Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the level of your performance" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cluj-napoca">
                            Cluj-Napoca
                          </SelectItem>
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
              </>
            )}

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Register
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserRegistrationForm;
