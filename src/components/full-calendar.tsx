//@ts-nocheck

'use client';

import roLocale from '@fullcalendar/core/locales/ro';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import { Tables } from '@/types/types_db';

interface DashboardFullCalendarProps {
  appointments: {
    date: string;
    id: string;
    status: 'scheduled' | 'present' | 'absent';
    student_id: string;
    type: 'appointment' | 'attendance';
    students: Tables<'students'>;
  }[];
}

const DashboardFullCalendar = ({
  appointments,
}: DashboardFullCalendarProps) => {
  const events = appointments.map((appointment) => ({
    id: appointment.id,
    title: appointment.students.full_name,
    start: appointment.date,
    end: appointment.date,
    color: 'red',
  }));

  return (
    <div className="relative w-full">
      <FullCalendar
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        headerToolbar={{
          start: 'title,prev,next',
          end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
        }}
        hiddenDays={[0]}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5, 6],
          startTime: '08:00',
          endTime: '21:00',
        }}
        slotMinTime={'08:00'}
        slotMaxTime={'21:30'}
        locale={roLocale}
        timeZone="UTC"
        height={600}
      />
    </div>
  );
};

export default DashboardFullCalendar;
