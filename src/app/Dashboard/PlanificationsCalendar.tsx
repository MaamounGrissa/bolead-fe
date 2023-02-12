import React from 'react';
import { CalendarMonth } from '@patternfly/react-core';

export const PlanificationsCalendar: React.FunctionComponent = () => {
  const [date, setDate] = React.useState(new Date());
  return (
    <>
      <CalendarMonth width="100%" date={date} onChange={setDate} />
    </>
  );
};