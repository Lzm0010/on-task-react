import React from 'react';
import {Button, Icon} from 'semantic-ui-react';

const GoalButton = ({handleClick}) => {
    const goalUrl = `http://localhost:3000/goals`;

    // t.string "name"
    // t.datetime "start_date"
    // t.datetime "end_date"
    // t.string "goal_type"
    // t.integer "goal_total_days"
    // t.float "goal_percentage"
    // t.bigint "user_id", null: false
    // t.string "frequency"

    const newGoal = () => {
        const goalObj = {
            'method': 'POST',
            'headers': {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            'body': JSON.stringify({name:null})
        }
        fetch(goalUrl, goalObj)
        .then(res => res.json())
        .then(goal => {
            // addTask(task)
            console.log(goal);
        })
    }

    const handleAddGoal = () => {
        handleClick();
    //    newGoal();
    }

    return (
        <Button onClick={handleAddGoal} color="teal">
            <Icon name="plus"/> Goal
        </Button>
    )
}

export default GoalButton;