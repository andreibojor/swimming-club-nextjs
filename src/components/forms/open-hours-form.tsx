'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import * as Icons from '@/components/icons';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/ui';
import { Json } from '@/types/types_db';
import { createClient } from '@/utils/supabase/client';
import { DialogClose } from '../ui/dialog';

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
  mondayOpen: z.string(),
  tuesday: z.string(),
  wednesday: z.string(),
  thursday: z.string(),
  friday: z.string(),
  saturday: z.string(),
  sunday: z.string(),
});

const OpenHoursPoolForm = ({ openHours }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  console.log(openHours);
  // 1. Define your form.
  const form = useForm<z.infer<typeof OpenHoursSchema>>({
    resolver: zodResolver(OpenHoursSchema),
    defaultValues: {
      mondayOpen: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof OpenHoursSchema>) {
    setIsSubmitting(true);

    try {
      const supabase = createClient();

      await supabase.from('users').update({
        role: role,
      });

      await supabase.from('students').update({
        full_name: fullStudentName,
        swimmer_level: swimmerLevel,
        pool: pool,
      });
    } catch (error) {
    } finally {
      setIsSubmitting(false);
      setIsOpen(false);
      toast.success('Event has been created');
    }
  }

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     if (search) {
  //       const newUrl = formUrlQuery({
  //         params: searchParams.toString(),
  //         key: 'q',
  //         value: search,
  //       });
  //       router.push(newUrl, { scroll: false });
  //     } else {
  //       if (pathname === route) {
  //         const newUrl = removeKeysFromQuery({
  //           params: searchParams.toString(),
  //           keysToRemove: ['q'],
  //         });

  //         router.push(newUrl, { scroll: false });
  //       }
  //     }
  //   }, 300);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [search, route, pathname, router, searchParams, query]);

  const [openHoursState, setOpenHoursState] = useState<Props[]>(openHours);
  console.log(openHoursState);
  const handleTimeChange = (
    dayId: string,
    time: string,
    isOpenTime: boolean,
  ) => {
    setOpenHoursState((prevOpenHours) =>
      prevOpenHours.map((day) =>
        day.id === dayId
          ? {
              ...day,
              // If it's the opening time, update the open_time property.
              // If it's the closing time, update the close_time property.
              ...(isOpenTime ? { open_time: time } : { close_time: time }),
            }
          : day,
      ),
    );
    console.log(`Time for day ${dayId} has been changed to ${time}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Orar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Orar bazin {`${openHours.id}`}
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {openHours.map((day) => (
          <div key={day.id}>
            <CardTitle className="text-xl">{day.day}</CardTitle>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <Label htmlFor={`area-${day.id}`}>De la</Label>
                <Input
                  type="time"
                  value={day.open_time.slice(0, 5)}
                  onChange={(e) =>
                    handleTimeChange(day.id, e.target.value, true)
                  }
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor={`area-${day.id}`}>Pana la</Label>
                <Input
                  type="time"
                  value={day.close_time.slice(0, 5)}
                  onChange={(e) =>
                    handleTimeChange(day.id, e.target.value, true)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default OpenHoursPoolForm;
