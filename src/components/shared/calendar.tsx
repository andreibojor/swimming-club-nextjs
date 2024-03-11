import React from 'react';

import { Calendar } from '@/components/ui';

const StudentCalendar = ({ studentActivity }) => {
  console.log(studentActivity);
  return (
    <>
      {studentActivity.map((student) => (
        <h1 key={student.id}>{student.date}</h1>
      ))}
      <Calendar />
    </>
  );
};

export default StudentCalendar;
