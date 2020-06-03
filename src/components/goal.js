import React from 'react';
import {Card, List} from 'semantic-ui-react';

const Goal = ({goal, removeGoal, removeTask}) => {

    const deleteGoal = () => {
        goal.tasks.forEach(task => {
            removeTask(task)
        });

        const goalUrl = `http://localhost:3000/goals/${goal.id}`
        const goalObj = {
            'method': 'DELETE',
            'headers': {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
        fetch(goalUrl, goalObj)
        .then(res => res.json())
        .then(goal => removeGoal(goal))
    }


    const handleDelete = () => {
        deleteGoal()
    }

    const handleEdit = () => {

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
                </List>
            </Card.Content>
        </Card>
    )
}

export default Goal;