// @ts-nocheck
'use client';

import React from 'react';
import { format, isAfter, isEqual } from 'date-fns';
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
  const activities = studentActivity.reduce((acc, activity) => {
    const date = new Date(activity.date).toISOString().split('T')[0];
    acc[date] = activity;
    return acc;
  }, {});

  const modifiers = {
    scheduled: (date) =>
      activities[date.toISOString().split('T')[0]]?.status === 'scheduled',
    present: (date) =>
      activities[date.toISOString().split('T')[0]]?.status === 'present',
    absent: (date) =>
      activities[date.toISOString().split('T')[0]]?.status === 'absent',
  };

  const modifiersClassNames = {
    scheduled: 'bg-primary',
    present: 'bg-green-700',
    absent: 'bg-red-500',
  };

  return (
    <>
      <Calendar
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        fromYear={2024}
        mode="multiple"
        weekStartsOn={1}
        components={{
          Day: ({ ...props }) => {
            const buttonRef = React.useRef<HTMLButtonElement>(null);
            const dayRender = useDayRender(
              props.date,
              props.displayMonth,
              buttonRef,
            );

            const dateStr = props.date.toISOString().split('T')[0];

            const activityStatus = activities[dateStr] || 'No activity';

            const currentDate = new Date();

            if (dayRender.isHidden) {
              return <div role="gridcell"></div>;
            }
            if (!dayRender.isButton) {
              return <div {...dayRender.divProps} />;
            }

            return (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    name="day"
                    ref={buttonRef}
                    {...dayRender.buttonProps}
                  />
                </PopoverTrigger>

                {activityStatus.status ? (
                  <PopoverContent>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          Status: {activityStatus.status}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {format(props.date, 'dd-MM-yyyy')}
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                ) : (
                  <PopoverContent>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          Status: {activityStatus.status}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {format(props.date, 'dd-MM-yyyy')}
                          <ScheduleLessonForm
                            poolOpenHours={poolOpenHours}
                            openDate={format(props.date, 'MM/dd/yyyy')}
                            studentDetails={studentDetails}
                          />
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
