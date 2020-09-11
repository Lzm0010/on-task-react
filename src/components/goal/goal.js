import React, {useState, useContext, useEffect} from 'react';
import {TasksContext} from '../../context/tasksContext';
import {Card, List, Confirm, Progress} from 'semantic-ui-react';

const Goal = ({goal, removeGoal, handleEditGoalClick, setCurrentGoal, formatDate}) => {
    const tasksContext = useContext(TasksContext);
    const {removeTask, tasksCompleted, tasksCompletedUpToDay, tasksUpToDay} = tasksContext;
    const filteredCompletedTasks = tasksCompletedUpToDay.filter(task => task.goal_id === goal.id).length;
    const filteredTotalTasks = tasksUpToDay.filter(task => task.goal_id === goal.id).length;
    const goalPercentage = filteredCompletedTasks/filteredTotalTasks * 100;
    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(tasksCompleted.filter(task => task.goal_id === goal.id).length);
    const [percentage, setPercentage] = useState(goalPercentage);
    const [color, setColor] = useState("grey");

    useEffect(() => {
        setProgress(tasksCompleted.filter(task => task.goal_id === goal.id).length)
    }, [tasksCompleted, goal.id])

    useEffect(() => {
        setPercentage(goalPercentage)
        if (goalPercentage >= (goal.goal_percentage * 100)){
            setColor("olive");
        } else {
            setColor("red");
        }
    }, [goalPercentage, goal.goal_percentage])

    const deleteGoal = () => {
        goal.tasks.forEach(task => {
            removeTask(task)
        });

        const goalUrl = `https://thawing-retreat-85272.herokuapp.com/goals/${goal.id}`
        const token = localStorage.getItem('token')
        const goalObj = {
            'method': 'DELETE',
            'headers': {
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
        fetch(goalUrl, goalObj)
        .then(res => res.json())
        .then(goal => removeGoal(goal))
    }

    const handleCancel = () => {
        setOpen(false);
    }
    const handleConfirm = () => {
        deleteGoal();
    }
    const handleDelete = () => {
        setOpen(true);
    }

    const handleEdit = () => {
        setCurrentGoal(goal);
        handleEditGoalClick();
    }

    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    {goal.name}
                </Card.Header>
                <Card.Meta>
                    {formatDate(goal.start_date)} - {formatDate(goal.end_date)}
                </Card.Meta>
                <Card.Description>
                    {goal.goal_type === "total" ? (
                        <Progress value={progress} total={goal.tasks.length} progress='ratio' color="olive"/>
                    ) : (
                        <Progress percent={percentage} progress color={color}/>
                    )}
                </Card.Description>
                <Card.Description>
                    {goal.frequency}
                </Card.Description>
                {goal.goal_percentage ? <Card.Description>Goal Percentage: {parseFloat(goal.goal_percentage * 100).toFixed(2)}%</Card.Description> : null}
            </Card.Content>
            <Card.Content extra>
                <List celled horizontal size="mini" floated="right">
                    <List.Item as="a" onClick={handleEdit}>Edit</List.Item>
                    <List.Item as="a" onClick={handleDelete}>Delete</List.Item>
                    <Confirm
                        open={open}
                        onCancel={handleCancel}
                        onConfirm={handleConfirm}
                        cancelButton='Never mind'
                        confirmButton="Let's do it" 
                        size='mini'
                    />
                </List>
            </Card.Content>
        </Card>
    )
}

export default Goal;