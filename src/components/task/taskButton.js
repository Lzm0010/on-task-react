import React from 'react';
import {Button, Icon} from 'semantic-ui-react';

const TaskButton = ({addTask, plannerDay}) => {
    const taskUrl = `http://localhost:3000/tasks`;

    // t.string "name"
    // t.integer "step_number"
    // t.bigint "project_id"
    // t.bigint "goal_id"
    // t.bigint "planner_id"
    // t.string "status"
    // t.boolean "is_completed"
    // t.datetime "date"

    const newTask = () => {
        const taskObj = {
            'method': 'POST',
            'headers': {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            'body': JSON.stringify({name:null, planner_id: 1, status: "active", is_completed: false, date: plannerDay})
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