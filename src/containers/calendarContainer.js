import React, {Fragment} from 'react';
import Calendar from '../components/calendar/calendar';

const CalendarContainer = ({showDay, tasks}) => {
    return (
        <Fragment>
            <Calendar showDay={showDay} tasks={tasks} />
        </Fragment>
    )
}

export default CalendarContainer;