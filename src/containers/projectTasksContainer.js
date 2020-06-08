import React, {Fragment} from 'react';
import ProjectTask from '../components/project/projectTask';
import {Button, Icon} from 'semantic-ui-react';

const ProjectTasksContainer = ({projectTasks, setProjectTasks, removeTask}) => {
    
    const addProjectTask = (e) => {
        e.preventDefault();
        setProjectTasks(tasks => [...projectTasks, {name:null, step_number: projectTasks.length+1, status: "active", is_completed: false, date: null}]);
    }

    const updateProjectTask = (task) => {
        const updatedTasks = [...projectTasks];
        const index = updatedTasks.findIndex(taskToUpdate => taskToUpdate.step_number === task.step_number);
        updatedTasks[index] = task;
        setProjectTasks(updatedTasks);
    }

    const deleteTask = (task) => {
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

    const removeProjectTask = (e, task) => {
        e.preventDefault();
        setProjectTasks(tasks => tasks.filter(dTask => dTask.step_number !== task.step_number))
        if (task.id){
            deleteTask(task)
        }
    }

    const displayProjectsTasks = () => (
        projectTasks.map(pTask => <ProjectTask key={`pt-${pTask.step_number}`} projectTask={pTask} updateProjectTask={updateProjectTask} removeProjectTask={removeProjectTask}/>)
    )

    return (
        <Fragment>
            {displayProjectsTasks()}
            <Button onClick={addProjectTask}><Icon name="plus"/>Task</Button>
        </Fragment>
    )
}

export default ProjectTasksContainer;