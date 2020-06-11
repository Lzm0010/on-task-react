import React, {useState, useContext, useEffect} from 'react';
import {TasksContext} from '../../context/tasksContext';
import {Card, List, Confirm, Progress} from 'semantic-ui-react';

const Goal = ({goal, removeGoal, handleEditGoalClick, setCurrentGoal, formatDate}) => {
    const tasksContext = useContext(TasksContext);
    const {removeTask, tasksCompleted} = tasksContext;
    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(tasksCompleted.filter(task => task.goal_id === goal.id).length);

    useEffect(() => {
        setProgress(tasksCompleted.filter(task => task.goal_id === goal.id).length)
    }, [tasksCompleted, goal.id])

    const deleteGoal = () => {
        goal.tasks.forEach(task => {
            removeTask(task)
        });

        const goalUrl = `http://localhost:3000/goals/${goal.id}`
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

    // t.string "name"
    // t.datetime "start_date"
    // t.datetime "end_date"
    // t.string "goal_type"
    // t.integer "goal_total_days"
    // t.float "goal_percentage"
    // t.bigint "user_id", null: false
    // t.string "frequency"

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
                        <Progress value={progress} total={goal.total_tasks} progress='ratio' warning/>
                    ) : (
                        <Progress percent={goal.percentage} progress warning/>
                    )}
                </Card.Description>
                <Card.Description>
                    {goal.frequency}
                </Card.Description>
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