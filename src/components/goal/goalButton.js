import React from 'react';
import {Button, Icon} from 'semantic-ui-react';

const GoalButton = ({handleClick}) => {
    const handleAddGoal = () => {
        handleClick();
    }

    return (
        <Button floated="right" onClick={handleAddGoal} color="teal">
            <Icon name="plus"/> Goal
        </Button>
    )
}

export default GoalButton;