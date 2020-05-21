import React, {Fragment} from 'react';
import Task from '../components/task';
import TaskButton from '../components/taskButton';
import {List} from 'semantic-ui-react';

const TasksContainer = ({tasks, addTask, plannerDay, removeTask, updateTask}) => {

    const displayTasks = () => (
        tasks.map(task => <List.Item key={task.id}><Task task={task} removeTask={removeTask} updateTask={updateTask}/></List.Item>)
    )

    return (
        <Fragment>
            <TaskButton addTask={addTask} plannerDay={plannerDay}/>
            <List divided relaxed>
                {displayTasks()} 
            </List>
        </Fragment>
    )
}

export default TasksContainer;