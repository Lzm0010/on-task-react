import React, {Fragment} from 'react';
import GoalContainer from './goalContainer';
import ProjectContainer from './projectContainer';
import Calendar from '../components/calendar/calendar';

const CalendarContainer = ({showDay}) => {
    return (
        <Fragment>
            <Calendar showDay={showDay} />
            <GoalContainer/>
            <ProjectContainer />
        </Fragment>
    )
}

export default CalendarContainer;