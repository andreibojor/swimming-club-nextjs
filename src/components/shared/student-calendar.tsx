'use client';

import React from 'react';
import { format, isAfter, isEqual, isToday } from 'date-fns';
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
  type ActivityStatus = 'scheduled' | 'present' | 'absent';

  interface StatusByDateMap {
    [key: string]: ActivityStatus;
  }
  const statusByDate: StatusByDateMap = {};
  studentActivity.forEach((activity) => {
    // Use `format` to simplify the date key creation
    const date = new Date(activity.date);
    const key = format(date, 'yyyy-MM-dd');
    statusByDate[key] = activity.status;
  });

  const modifiers = {
    scheduled: (date: Date) =>
      statusByDate[format(date, 'yyyy-MM-dd')] === 'scheduled',
    present: (date: Date) =>
      statusByDate[format(date, 'yyyy-MM-dd')] === 'present',
    absent: (date: Date) =>
      statusByDate[format(date, 'yyyy-MM-dd')] === 'absent',
  };

  const modifiersClassNames = {
    scheduled: 'bg-primary text-slate-50',
    present: 'bg-green-700 text-slate-50',
    absent: 'bg-red-500 text-slate-50',
  };

  function isTodayOrFuture(date: Date) {
    // Simplify comparison using `isToday` and `isAfter`
    const today = new Date();
    return isToday(date) || isAfter(date, today);
  }

  return (
    <>
      <Calendar
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        fromYear={2024}
        mode="multiple"
        weekStartsOn={1}
        location="profile"
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
