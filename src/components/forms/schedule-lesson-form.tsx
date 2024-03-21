// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { setAppointment } from '@/utils/actions/attendance';

interface Props {
  type?: 'create' | 'edit';
  userId: string;
  questionDetails?: string;
  appointmentDate: string;
}

const RegistrationSchema = z.object({
  hour: z.string(),
  date: z.string(),
});

const ScheduleLessonForm = ({
  appointmentDate,
  poolOpenHours,
  onDate,
  studentDetails,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  function getOpenHoursFormat(onDate, openTime, closeTime) {
    // Convert strings into date
    let start = new Date(`${onDate} ${openTime}`);
    let end = new Date(`${onDate} ${closeTime}`);
    // Subtract one hour from the close time
    end.setHours(end.getHours() - 1);
    // Array to hold results
    let timeSlots = [];

    // Iterate until we reach the close time
    while (start <= end) {
      // Push formatted time into array
      timeSlots.push(
        ('0' + start.getHours()).slice(-2) +
          ':' +
          ('0' + start.getMinutes()).slice(-2),
      );

      // Add 15 minutes
      start.setMinutes(start.getMinutes() + 15);
    }

    return timeSlots;
  }
  const formattedDate = onDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  const openHoursSelectList = getOpenHoursFormat(
    onDate.toISOString().slice(0, 10), // Convert onDate to YYYY-MM-DD format
    poolOpenHours[onDate.getDay()].open_time,
    poolOpenHours[onDate.getDay()].close_time,
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      hour: '',
      date: formattedDate,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof RegistrationSchema>) {
    setIsSubmitting(true);

    // Convert hour and date to timestampz format
    const timestamptzHour = `${values.date} ${values.hour}:00`;
    console.log('Timestampz format:', timestamptzHour);
    try {
      setAppointment({
        studentId: studentDetails.id,
        date: timestamptzHour,
      });
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Schedule Lesson</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[325px]">
        <DialogHeader>
          <DialogTitle>Programati o lectie de inot</DialogTitle>
          <DialogDescription>
            Alegeti o ora pentru a va programama la data de {appointmentDate}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid">
            <FormField
              control={form.control}
              name="hour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selectati ora</FormLabel>
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
                      {openHoursSelectList.map((selectHour) => (
                        <SelectItem key={selectHour} value={selectHour}>
                          {selectHour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
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

export default ScheduleLessonForm;
