import React, {useContext} from 'react';
import {TasksContext} from '../../context/tasksContext';
import {Button, Icon} from 'semantic-ui-react';

const TaskButton = ({planner, plannerDay}) => {
    const tasksContext = useContext(TasksContext);
    const {addTask} = tasksContext;
    
    const newTask = () => {
        const taskUrl = `http://localhost:3000/tasks`;
        const token = localStorage.getItem('token')
        const taskObj = {
            'method': 'POST',
            'headers': {
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            }, 
            'body': JSON.stringify({name:null, planner_id: planner.id, status: "active", is_completed: false, date: plannerDay})
        }
        fetch(taskUrl, taskObj)
        .then(res => res.json())
        .then(task => {
            addTask(task)
        })
    }

    const handleClick = () => {
       newTask();
    }

    return (
        <Button fluid color="teal" onClick={handleClick}>
            <Icon name="paper plane"/> Add Task
        </Button>
    )
}

export default TaskButton;