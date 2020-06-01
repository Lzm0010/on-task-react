import React, {Fragment} from 'react';
import ProjectTask from '../components/projectTask';
import {Button, Icon} from 'semantic-ui-react';

const ProjectTasksContainer = ({projectTasks, setProjectTasks}) => {

    const displayProjectsTasks = () => (
        projectTasks.map(pTask => <ProjectTask key={`pt-${pTask}`} step={pTask}/>)
    )

    const addProjectTask = (e) => {
        e.preventDefault();
        setProjectTasks(tasks => [...projectTasks, projectTasks.length+1]);
    }

    return (
        <Fragment>
            {displayProjectsTasks()}
            <Button onClick={addProjectTask}><Icon name="plus"/>Task</Button>
        </Fragment>
    )
}

export default ProjectTasksContainer;