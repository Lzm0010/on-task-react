import React, {Fragment} from 'react';
import Goal from '../components/goal/goal';
import Project from '../components/project/project'
import {Divider, Icon, Header, Card} from 'semantic-ui-react';

const ProgressContainer = ({goals, projects, removeGoal, removeProject, handleProjClick, handleGoalClick, handleEditProjClick, handleEditGoalClick, setCurrentProject, setCurrentGoal}) => {

    const formatDate = (date) => {
        const months = ["January", "February", "March", 
        "April", "May", "June", "July", "August", "September", 
        "October", "November", "December"];

        const d = new Date(date);
        const curr_date = d.getDate();
        let sup = "";
        if (curr_date === 1 || curr_date === 21 || curr_date ===31)
        {
        sup = "st";
        }
        else if (curr_date === 2 || curr_date ===22)
        {
        sup = "nd";
        }
        else if (curr_date === 3 || curr_date === 23)
        {
        sup = "rd";
        }
        else
        {
        sup = "th";
        }
        const month = d.getMonth();

        return `${months[month]} ${curr_date}${sup}`;
    }

    const displayProgressGoals = () => (
        goals.map(goal => <Goal key={`g-${goal.id}`} goal={goal} removeGoal={removeGoal} handleGoalClick={handleGoalClick} handleEditGoalClick={handleEditGoalClick} setCurrentGoal={setCurrentGoal} formatDate={formatDate}/>)
    )
    
    const displayProgressProjects = () => (
        projects.map(project => <Project key={`p-${project.id}`} project={project} removeProject={removeProject} handleProjClick={handleProjClick} handleEditProjClick={handleEditProjClick} setCurrentProject={setCurrentProject} formatDate={formatDate}/>)
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