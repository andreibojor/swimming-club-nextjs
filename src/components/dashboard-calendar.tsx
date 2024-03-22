'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format, isAfter, isEqual } from 'date-fns';
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
    const today = new Date();
    // Remove time part from today's date
    const todayWithoutTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    // Remove time part from the provided date
    const dateWithoutTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    return dateWithoutTime >= todayWithoutTime;
  }

  const formatDateToLocalISOString = (date: Date) => {
    // Format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // JS months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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
            const key = `${props.date.getFullYear()}-${(
              props.date.getMonth() + 1
            )
              .toString()
              .padStart(
                2,
                '0',
              )}-${props.date.getDate().toString().padStart(2, '0')}`;

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
