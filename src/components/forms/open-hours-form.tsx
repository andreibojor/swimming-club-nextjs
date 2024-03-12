'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
import { Json } from '@/types/types_db';
import { createClient } from '@/utils/supabase/client';
import { DialogClose } from '../ui/dialog';

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
  fullStudentName: z.string(),
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

const OpenHoursPoolForm = ({ openHours }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 1. Define your form.
  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      fullStudentName: '',
      phoneNumber: '',
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
      const {
        role,
        phoneNumber,
        swimmerLevel,
        pool,
        medicalCertificate,
        fullStudentName,
      } = values;

      await supabase
        .from('users')
        .update({
          phone: phoneNumber,
          role: role,
          completed_registration: true,
        })
        .eq('id', userDetails.id);

      if (selectedRole === 'student') {
        await supabase
          .from('students')
          .update({
            parent_id: userDetails.id,
            full_name: fullStudentName,
            swimmer_level: swimmerLevel,
            pool: pool,
            student_phone: phoneNumber,
            medical_certificate_path: `mc-${userDetails.id}`,
          })
          .eq('id', userDetails.id);

        // await supabase.storage
        //   .from('medical-certificates')
        //   .upload(`mc-${userDetails.id}`, medicalCertificate, {
        //     cacheControl: '3600',
        //     upsert: false,
        //   });
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
      setIsOpen(false);
      toast.success('Event has been created');
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
            <FormDescription>
              Select the desired payment method.
            </FormDescription>
            {form.watch('role') === 'student' && (
              <FormField
                control={form.control}
                name="fullStudentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nume</FormLabel>
                    <FormControl>
                      <Input placeholder="Nume si prenume student" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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

export default OpenHoursPoolForm;
