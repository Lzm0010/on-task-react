import React, {Fragment, useState} from 'react';
import {Checkbox, Button, Input} from 'semantic-ui-react';

const Task = ({task, updateTask, removeTask}) => {
    const [name, setName] = useState(task.name);
    const [checked, setChecked] = useState(task.is_completed);
    const [editing, setEditing] = useState(task.name ? false : true);

    const editTask = (name) => {
        const taskUrl = `http://localhost:3000/tasks/${task.id}`
        const taskObj = {
            'method': 'PATCH',
            'headers': {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            'body': JSON.stringify({name})
        }
        fetch(taskUrl, taskObj)
        .then(res => res.json())
        .then(task => {
            setName(name);
            updateTask(task);
        })
    }

    const deleteTask = () => {
        const taskUrl = `http://localhost:3000/tasks/${task.id}`
        const taskObj = {
            'method': 'DELETE',
            'headers': {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
        fetch(taskUrl, taskObj)
        .then(res => res.json())
        .then(task => removeTask(task))
    }

    const toggleCheck = () => {
        setChecked(!checked);
    }

    const toggleEditing = () => {
        setEditing(!editing);
    }

    const handleNameChange = (event) => {
        const name = event.target.value;
        setName(name);
    }

    const handleEdit = () => {
        editTask(name);
        toggleEditing();
    }

    return (
        <Fragment>
            {editing ? <Input 
                action={{
                    color: 'teal',
                    icon: 'plus square outline',
                    onClick: handleEdit
                    }}
                placeholder="Task name..."
                value={name}
                onChange={handleNameChange}
                /> : <Checkbox onChange={toggleCheck} checked={checked} label={<label>{name}</label>}/>}
            <Button.Group floated='right'>
                <Button basic color='blue' icon='edit' onClick={toggleEditing} />
                <Button basic color='red' icon='delete' onClick={deleteTask} />
            </Button.Group>
        </Fragment>
    )
}

export default Task;