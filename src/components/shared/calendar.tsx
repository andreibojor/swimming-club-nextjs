'use client';

import React from 'react';
import { format, isAfter } from 'date-fns';
import { Button, useDayPicker, useDayRender } from 'react-day-picker';

import {
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { StudentCalendarProps } from '@/types/types';
import ScheduleLessonForm from '../forms/schedule-lesson-form';

const StudentCalendar = ({ studentActivity }: StudentCalendarProps) => {
  const activities = {};
  studentActivity.map((activity) => {
    const date = new Date(activity.date).toISOString().split('T')[0];
    activities[date] = activities[date]
      ? [...activities[date], activity.status]
      : [activity.status];
  });

  const modifiers = {
    scheduled: (date) => {
      const dateStr = date.toISOString().split('T')[0];
      return activities[dateStr]?.includes('scheduled');
    },
    present: (date) => {
      const dateStr = date.toISOString().split('T')[0];
      return activities[dateStr]?.includes('present');
    },
    absent: (date) => {
      const dateStr = date.toISOString().split('T')[0];
      return activities[dateStr]?.includes('absent');
    },
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

            const dateStr = props.date.toISOString().split('T')[0];

            const activityStatus = activities[dateStr] || 'No activity';

            // Inside the Day component
            const currentDate = new Date();
            const isFutureDate = isAfter(props.date, currentDate);

            return (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    name="day"
                    ref={buttonRef}
                    {...dayRender.buttonProps}
                  />
                </PopoverTrigger>

                {activityStatus[0] === 'present' ||
                activityStatus[0] === 'scheduled' ||
                activityStatus[0] === 'absent' ? (
                  <PopoverContent>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          Status: {activityStatus}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {format(props.date, 'dd-MM-yyyy')}
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                ) : (
                  isFutureDate && (
                    <PopoverContent>
                      <ScheduleLessonForm
                        userId={studentActivity[0].student_id}
                        appointmentDate={format(props.date, 'dd-MM-yyyy')}
                      />
                    </PopoverContent>
                  )
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
