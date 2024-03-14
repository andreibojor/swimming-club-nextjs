'use client';

import React, { useRef } from 'react';
import { getUnixTime } from 'date-fns';
import {
  Button,
  Day,
  DayContent,
  useDayPicker,
  useDayRender,
  WeekNumber,
} from 'react-day-picker';

import {
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { StudentCalendarProps } from '@/types/types';
import { cn } from '@/utils/cn';

const StudentCalendar = ({ studentActivity }: StudentCalendarProps) => {
  console.log(studentActivity);

  return (
    <>
      <Calendar
        studentActivity={studentActivity}
        // mode="multiple"
        // selected={dates}
        fromYear={2024}

        // components={{
        //   Row: ({ ...props }) => {
        //     const { styles, classNames, showWeekNumber, components } =
        //       useDayPicker();

        //     const DayComponent = components?.Day ?? Day;
        //     const WeeknumberComponent = components?.WeekNumber ?? WeekNumber;

        //     let weekNumberCell;
        //     if (showWeekNumber) {
        //       weekNumberCell = (
        //         <td className={classNames.cell} style={styles.cell}>
        //           <WeeknumberComponent
        //             number={props.weekNumber}
        //             dates={props.dates}
        //           />
        //         </td>
        //       );
        //     }

        //     return (
        //       <tr className={classNames.row} style={styles.row}>
        //         {weekNumberCell}
        //         {props.dates.map((date) => (
        //           <td
        //             className={cn(classNames.cell)}
        //             style={styles.cell}
        //             key={getUnixTime(date)}
        //             role="presentation"
        //           >
        //             <DayComponent
        //               displayMonth={props.displayMonth}
        //               date={date}
        //             />
        //           </td>
        //         ))}
        //       </tr>
        //     );
        //   },
      />
    </>
  );
};

export default StudentCalendar;
