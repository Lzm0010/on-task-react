import React, {Fragment} from 'react';
import Calendar from '../components/calendar/calendar';

const CalendarContainer = ({showDay, tasks, addTask, addProject, addGoal}) => {
    return (
        <Fragment>
            <Calendar showDay={showDay} tasks={tasks} addTask={addTask} addProject={addProject} addGoal={addGoal}/>
        </Fragment>
    )
}

export default CalendarContainer;