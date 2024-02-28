'use client';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

const DashboardFullCalendar = () => {
  return (
    <div className="relative flex w-full">
      <FullCalendar
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={[
          { title: 'event 1', date: '2024-02-06' },
          { title: 'event 2', date: '2024-02-07' },
        ]}
        headerToolbar={{
          start: 'title,prev,next',
          end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
        }}
        hiddenDays={[0]}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5, 6],
          startTime: '09:00',
          endTime: '21:00',
        }}
        slotMinTime={'09:00'}
        slotMaxTime={'21:30'}
      />
    </div>
  );
};

export default DashboardFullCalendar;
