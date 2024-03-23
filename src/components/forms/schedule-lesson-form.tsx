'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMinutes, format, setHours, setMinutes } from 'date-fns';
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
  time: z.string(),
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

  const getOpenHoursFormat = (
    onDate: Date,
    openTime: string,
    closeTime: string,
  ) => {
    const [openHour, openMinute] = openTime.split(':').map(Number);
    const [closeHour, closeMinute] = closeTime.split(':').map(Number);

    let start = setHours(setMinutes(onDate, openMinute), openHour);
    const end = setHours(setMinutes(onDate, closeMinute), closeHour - 1); // Subtracting one hour from close time

    let timeSlots: string[] = [];

    while (start <= end) {
      timeSlots.push(format(start, 'HH:mm'));
      start = addMinutes(start, 15); // Add 15 minutes
    }

    return timeSlots;
  };
  // Using date-fns to format onDate
  const formattedDate = format(onDate, 'MM-dd-yyyy');

  const openHoursForDay = poolOpenHours[onDate.getDay()];
  const openHoursSelectList = getOpenHoursFormat(
    onDate,
    openHoursForDay.open_time,
    openHoursForDay.close_time,
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      hour: '',
      date: formattedDate,
      time: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof RegistrationSchema>) {
    setIsSubmitting(true);
    const { date, time } = values;
    try {
      setAppointment({
        studentId: studentDetails.id,
        date: date,
        time: time,
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
              name="time"
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
