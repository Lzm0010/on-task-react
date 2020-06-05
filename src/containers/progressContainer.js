import React, {Fragment} from 'react';
import Goal from '../components/goal/goal';
import Project from '../components/project/project'
import {Divider, Icon, Header, Card} from 'semantic-ui-react';

const ProgressContainer = ({goals, projects, removeGoal, removeProject, removeTask, handleProjClick, handleGoalClick, handleEditProjClick, setCurrentProject}) => {

    const displayProgressGoals = () => (
        goals.map(goal => <Goal key={`g-${goal.id}`} goal={goal} removeGoal={removeGoal} removeTask={removeTask} handleGoalClick={handleGoalClick}/>)
    )
    
    const displayProgressProjects = () => (
        projects.map(project => <Project key={`p-${project.id}`} project={project} removeProject={removeProject} removeTask={removeTask} handleProjClick={handleProjClick} handleEditProjClick={handleEditProjClick} setCurrentProject={setCurrentProject}/>)
    )

    return (
        <Fragment>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='trophy'/>
                    Goals
                </Header>
            </Divider>
            <Card.Group>
                {displayProgressGoals()}
            </Card.Group>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='road'/>
                    Projects
                </Header>
            </Divider>
            <Card.Group>
                {displayProgressProjects()}
            </Card.Group>
        </Fragment>
    )
}

export default ProgressContainer;