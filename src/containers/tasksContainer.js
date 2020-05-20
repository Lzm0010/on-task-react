import React, {Fragment} from 'react';
import Task from '../components/task';
import TaskButton from '../components/taskButton';
import {List} from 'semantic-ui-react';

const TasksContainer = ({tasks}) => {

    const displayTasks = () => (
        tasks.map(task => <List.Item><Task key={task.id} task={task}/></List.Item>)
    )

    return (
        <Fragment>
            <TaskButton />
            <List divided relaxed>
                {displayTasks()} 
            </List>
        </Fragment>
    )
}

export default TasksContainer;