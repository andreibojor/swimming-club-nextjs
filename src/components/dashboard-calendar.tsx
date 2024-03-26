'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  format,
  isAfter,
  isEqual,
  isFuture,
  isToday,
  startOfDay,
} from 'date-fns';
import { Button, useDayPicker, useDayRender } from 'react-day-picker';

import {
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { DashboardCalendarProps } from '@/types/types';
import { formUrlQuery } from '@/utils/urlQuery';

const DashboardCalendar = ({ date, setDate }: DashboardCalendarProps) => {
  function isTodayOrFuture(date: Date) {
    // Using date-fns to check if the date is today or in the future
    const dateStartOfDay = startOfDay(date);
    return isToday(dateStartOfDay) || isFuture(dateStartOfDay);
  }

  const formatDateToLocalISOString = (date: Date) => {
    // Use date-fns to format the date as YYYY-MM-DD
    return format(date, 'yyyy-MM-dd');
  };

  const selectedDate = new Date(date);
  return (
    <>
      <Calendar
        selected={selectedDate}
        onSelect={(selectedDate) =>
          selectedDate && setDate(formatDateToLocalISOString(selectedDate))
        }
        fromYear={2024}
        mode="single"
        weekStartsOn={1}
        location="dashboard"
        components={{
          Day: ({ ...props }) => {
            const buttonRef = React.useRef<HTMLButtonElement>(null);
            const dayRender = useDayRender(
              props.date,
              props.displayMonth,
              buttonRef,
            );

            if (dayRender.isHidden) {
              return <div role="gridcell"></div>;
            }
            if (!dayRender.isButton) {
              return <div {...dayRender.divProps} />;
            }

            // Get the key for the statusByDate object
            const key = format(props.date, 'yyyy-MM-dd');

            return (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    name="day"
                    ref={buttonRef}
                    {...dayRender.buttonProps}
                  />
                </PopoverTrigger>

                {isTodayOrFuture(props.date) && (
                  <PopoverContent>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium capitalize leading-none"></h4>
                        <p className="text-sm text-muted-foreground">
                          {format(props.date, 'dd-MM-yyyy')}
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                )}
              </Popover>
            );
          },
        }}
      />
    </>
  );
};

export default DashboardCalendar;
