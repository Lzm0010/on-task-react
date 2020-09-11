import React, {useState, useContext} from 'react';
import {TasksContext} from '../../context/tasksContext';
import {Checkbox} from 'semantic-ui-react';

const CalTask = ({task, projects}) => {
    const tasksContext = useContext(TasksContext);
    const {updateTask} = tasksContext;
    const [checked, setChecked] = useState(task.is_completed);

    const editTask = (is_completed) => {
        const taskUrl = `https://thawing-retreat-85272.herokuapp.com/tasks/${task.id}`
        const token = localStorage.getItem('token')
        const taskObj = {
            'method': 'PATCH',
            'headers': {
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            }, 
            'body': JSON.stringify({is_completed})
        }
        fetch(taskUrl, taskObj)
        .then(res => res.json())
        .then(task => {
            updateTask(task);
            if (task.project_id !== null){
                const proj = projects.find(proj => proj.id === task.project_id);
                const projTasks = proj.tasks.map(ptask => ptask.id === task.id ? task : ptask);
                proj.tasks = projTasks;
            }
        })
    }


    const toggleCheck = (e) => {
        e.stopPropagation();
        const value = !checked;
        setChecked(value);
        editTask(value);
    }

    return (
        <Checkbox onChange={toggleCheck} checked={checked} label={<label>{task.name}</label>}/>
    )
}

export default CalTask;