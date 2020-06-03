import React, {Fragment} from 'react';
import Goal from '../components/goal';
import Project from '../components/project'
import {Divider, Icon, Header, Card} from 'semantic-ui-react';

const ProgressContainer = ({goals, projects, removeGoal, removeProject, removeTask}) => {

    // const deleteTask = (task) => {
    //     const taskUrl = `http://localhost:3000/tasks/${task.id}`
    //     const taskObj = {
    //         'method': 'DELETE',
    //         'headers': {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json"
    //         }
    //     }
    //     fetch(taskUrl, taskObj)
    //     .then(res => res.json())
    //     .then(task => removeTask(task))
    // }

    const displayProgressGoals = () => (
        goals.map(goal => <Goal key={`g-${goal.id}`} goal={goal} removeGoal={removeGoal} removeTask={removeTask}/>)
    )
    
    const displayProgressProjects = () => (
        projects.map(project => <Project key={`p-${project.id}`} project={project} removeProject={removeProject} removeTask={removeTask}/>)
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