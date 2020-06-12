import React, {Fragment, useState, useContext} from 'react';
import {TasksContext} from '../../context/tasksContext';
import {Form, Input, Header} from 'semantic-ui-react';

const TaskFilter = () => {
    const tasksContext = useContext(TasksContext);
    const {filterTasks} = tasksContext;

    const [goalCheck, setGoalCheck] = useState(true);
    const [plannerCheck, setPlannerCheck] = useState(true);
    const [projectCheck, setProjectCheck] = useState(true);
    
    const handleGoalChecked = () => {
        const value = !goalCheck;
        setGoalCheck(value);
        filterTasks(value, plannerCheck, projectCheck);
    }

    const handlePlannerChecked = () => {
        const value = !plannerCheck;
        setPlannerCheck(value);
        filterTasks(goalCheck, value, projectCheck);
    }

    const handleProjectChecked = () => {
        const value = !projectCheck;
        setProjectCheck(value);
        filterTasks(goalCheck, plannerCheck, value);
    }

    return (
        <Fragment>
            <Header as="h2">
                Filter Tasks
            </Header>
            <Form>
                <Form.Group>
                    <label>Tasks Shown:</label>
                    <Form.Field inline label='Goal' control={Input} type='checkbox' checked={goalCheck} onChange={handleGoalChecked} />
                    <Form.Field inline label='Planner' control={Input} type='checkbox' checked={plannerCheck} onChange={handlePlannerChecked}/>
                    <Form.Field inline label='Project' control={Input} type='checkbox' checked={projectCheck} onChange={handleProjectChecked}/>
                </Form.Group>
            </Form>
        </Fragment>
    )
}

export default TaskFilter;