import React, {Fragment} from 'react';
import GoalContainer from './goalContainer';
import ProjectContainer from './projectContainer';
import Calendar from '../components/calendar/calendar';

const CalendarContainer = () => {
    return (
        <Fragment>
            <Calendar />
            <GoalContainer/>
            <ProjectContainer />
        </Fragment>
    )
}

export default CalendarContainer;