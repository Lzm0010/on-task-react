import React, {useState} from 'react';
import {Card, List, Confirm} from 'semantic-ui-react';

const Goal = ({goal, removeGoal, removeTask, handleEditGoalClick, setCurrentGoal}) => {
    const [open, setOpen] = useState(false);

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

    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    {goal.name}
                </Card.Header>
                <Card.Description>
                    Progress Filler
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