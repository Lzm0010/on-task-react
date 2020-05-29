import React, {Fragment} from 'react';
import GoalContainer from './goalContainer';
import ProjectContainer from './projectContainer';
import Calendar from '../components/calendar/calendar';

const CalendarContainer = ({showDay, tasks}) => {
    return (
        <Fragment>
            <Calendar showDay={showDay} tasks={tasks} />
        </Fragment>
    )
}

export default CalendarContainer;