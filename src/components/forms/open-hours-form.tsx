'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
} from '@/components/ui';
import { changeOpenHours } from '@/utils/actions/pool';

interface Props {
  openHours: {
    id: string;
    pool_id: string;
    day: string;
    open_time: string;
    close_time: string;
  }[];
}

const OpenHoursSchema = z.object({
  openHoursFields: z.array(
    z.object({
      id: z.string(),
      pool_id: z.string(),
      day: z.string(),
      open_time: z.string(),
      close_time: z.string(),
    }),
  ),
});

const useDynamicForm = ({ openHours }: Props) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof OpenHoursSchema>>({
    resolver: zodResolver(OpenHoursSchema),
    defaultValues: { openHoursFields: openHours || [] },
    // mode: 'onChange',
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: 'openHoursFields',
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof OpenHoursSchema>) {
    const { openHoursFields } = values;
    try {
      await changeOpenHours(openHoursFields);

      toast.success('Open hours updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update open hours. Please try again.');
    }
  }

  return { form, onSubmit, openHoursFields: fields };
};

const OpenHoursPoolForm = ({ openHours }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { form, onSubmit, openHoursFields } = useDynamicForm({ openHours });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Orar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Orar bazin</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" grid space-y-8"
          >
            {openHoursFields.map((day, index) => (
              <div key={day.id} className="flex justify-between ">
                <h1>{day.day}</h1>
                <FormField
                  control={form.control}
                  name={`openHoursFields.${index}.id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`openHoursFields.${index}.pool_id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`openHoursFields.${index}.open_time`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>De la</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`openHoursFields.${index}.close_time`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pana la</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
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
