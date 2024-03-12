'use client';

import React from 'react';

import { Calendar } from '@/components/ui';
import { StudentCalendarProps } from '@/types/types';

const StudentCalendar = ({ studentActivity }: StudentCalendarProps) => {
  const dates = studentActivity.map((date) => new Date(date.date));

  return (
    <>
      <Calendar
        mode="multiple"
        selected={dates}
        fromYear={2024}
        onDayClick={() => console.log(dates)}
      />
    </>
  );
};

export default StudentCalendar;
