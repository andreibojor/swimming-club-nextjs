'use client';

import React from 'react';
import { format, isAfter, isEqual } from 'date-fns';
import { Activity } from 'lucide-react';
import { Button, useDayPicker, useDayRender } from 'react-day-picker';

import {
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { StudentCalendarProps } from '@/types/types';
import ScheduleLessonForm from '../forms/schedule-lesson-form';

const StudentCalendar = ({
  studentActivity,
  poolOpenHours,
  studentDetails,
}: StudentCalendarProps) => {
  // This issue can be resolved by properly accounting for the timezone differences.
  // In JavaScript, the `Date` object is created in the client's timezone, and this leads
  // to shifts when you are trying to convert it back to a string.

  // To get around this issue, you can manually construct the key for `statusByDate` by
  // pulling out the Year, Month, and Day parts individually as follows:

  const statusByDate = [];
  studentActivity.forEach((activity) => {
    const date = new Date(activity.date);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // getUTCMonth() starts from 0
    const day = date.getUTCDate(); // getUTCDate() starts from 1
    const key = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    statusByDate[key] = activity.status;
  });

  const modifiers = {
    scheduled: (date) =>
      statusByDate[
        `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
      ] === 'scheduled',
    present: (date) =>
      statusByDate[
        `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
      ] === 'present',
    absent: (date) =>
      statusByDate[
        `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
      ] === 'absent',
  };

  const modifiersClassNames = {
    scheduled: 'bg-primary',
    present: 'bg-green-700',
    absent: 'bg-red-500',
  };

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

  return (
    <>
      <Calendar
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        fromYear={2024}
        mode="multiple"
        weekStartsOn={0}
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

                {isTodayOrFuture(props.date) ? (
                  <PopoverContent>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium capitalize leading-none">
                          {statusByDate[key] && 'Programare'}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {format(props.date, 'dd-MM-yyyy')}
                          <ScheduleLessonForm
                            poolOpenHours={poolOpenHours}
                            onDate={props.date}
                            studentDetails={studentDetails}
                          />
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                ) : (
                  <PopoverContent>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium capitalize leading-none">
                          {statusByDate[key] === 'present'
                            ? 'Prezent'
                            : 'Absent'}
                          {/* Display status here */}
                        </h4>
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

export default StudentCalendar;
