import React, {Fragment, useContext} from 'react';
import {TasksContext} from '../context/tasksContext';
import ProjectTask from '../components/project/projectTask';
import {Button, Icon} from 'semantic-ui-react';

const ProjectTasksContainer = ({projectTasks, setProjectTasks}) => {
    const tasksContext = useContext(TasksContext);
    const {removeTask} = tasksContext;

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
        const taskUrl = `https://thawing-retreat-85272.herokuapp.com/tasks/${task.id}`
        const token = localStorage.getItem('token')
        const taskObj = {
            'method': 'DELETE',
            'headers': {
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`,
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
        projectTasks.sort((a,b) => a.step_number - b.step_number).map((pTask, i)=> <ProjectTask key={`pt-${i}`} projectTask={pTask} updateProjectTask={updateProjectTask} removeProjectTask={removeProjectTask}/>)
    )

    return (
        <Fragment>
            {displayProjectsTasks()}
            <Button onClick={addProjectTask}><Icon name="plus"/>Task</Button>
        </Fragment>
    )
}

export default ProjectTasksContainer;