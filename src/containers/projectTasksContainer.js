import React, {Fragment} from 'react';
import ProjectTask from '../components/project/projectTask';
import {Button, Icon} from 'semantic-ui-react';

const ProjectTasksContainer = ({projectTasks, setProjectTasks}) => {
    
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

    const displayProjectsTasks = () => (
        projectTasks.map(pTask => <ProjectTask key={`pt-${pTask.step_number}`} projectTask={pTask} updateProjectTask={updateProjectTask}/>)
    )

    return (
        <Fragment>
            {displayProjectsTasks()}
            <Button onClick={addProjectTask}><Icon name="plus"/>Task</Button>
        </Fragment>
    )
}

export default ProjectTasksContainer;