'use client';

import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import FullCalendar from '@fullcalendar/react';

const DashboardFullCalendar = () => {
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      dateClick={handleDateClick}
    />
  );
};

export default DashboardFullCalendar;
