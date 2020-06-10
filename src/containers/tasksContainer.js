import React, {Fragment} from 'react';
import Task from '../components/task/task';
import TaskButton from '../components/task/taskButton';
import {List} from 'semantic-ui-react';

const TasksContainer = ({tasks, addTask, planner, plannerDay, removeTask, updateTask}) => {

    const displayTasks = () => (
        tasks.map(task => <List.Item key={task.id}><Task task={task} removeTask={removeTask} updateTask={updateTask}/></List.Item>)
    )

    return (
        <Fragment>
            <TaskButton planner={planner} addTask={addTask} plannerDay={plannerDay}/>
            <List divided relaxed>
                {displayTasks()} 
            </List>
        </Fragment>
    )
}

export default TasksContainer;