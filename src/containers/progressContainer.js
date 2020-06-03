import React, {Fragment} from 'react';
import Goal from '../components/goal';
import Project from '../components/project'
import {Divider, Icon, Header} from 'semantic-ui-react';

const ProgressContainer = ({goals, projects}) => {

    const displayProgressGoals = () => (
        goals.map(goal => <Goal key={`g-${goal.id}`} goal={goal}/>)
    )
    
    const displayProgressProjects = () => (
        projects.map(project => <Project key={`p-${project.id}`} project={project} />)
    )

    return (
        <Fragment>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='trophy'/>
                    Goals
                </Header>
            </Divider>
            {displayProgressGoals()}
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='road'/>
                    Projects
                </Header>
            </Divider>
            {displayProgressProjects()}
        </Fragment>
    )
}

export default ProgressContainer;