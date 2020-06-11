import React, {Fragment, useContext} from 'react';
import {TasksContext} from '../context/tasksContext';
import Task from '../components/task/task';
import TaskButton from '../components/task/taskButton';
import {List} from 'semantic-ui-react';

const TasksContainer = ({planner, plannerDay}) => {
    const tasksContext = useContext(TasksContext);
    const {dayTasks} = tasksContext;

    const displayTasks = () => (
        dayTasks.map(task => <List.Item key={task.id}><Task task={task}/></List.Item>)
    )

    return (
        <Fragment>
            <TaskButton planner={planner} plannerDay={plannerDay}/>
            <List divided relaxed>
                {displayTasks()} 
            </List>
        </Fragment>
    )
}

export default TasksContainer;