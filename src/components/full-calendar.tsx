'use client';

import roLocale from '@fullcalendar/core/locales/ro';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

const DashboardFullCalendar = ({ events }) => {
  console.log(events);
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
          startTime: '09:00',
          endTime: '21:00',
        }}
        slotMinTime={'09:00'}
        slotMaxTime={'21:30'}
        locale={roLocale}
      />
    </div>
  );
};

export default DashboardFullCalendar;
