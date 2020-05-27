import React from 'react';
import CalTask from './calTask';
import {Card, Grid, Feed} from 'semantic-ui-react'


const Day = ({day, displayDay, showDay, dailyTasks}) => {

    const handleClick = () => {
        showDay(day)
    };

    const displayTasks = () => {
        return dailyTasks.map(task => <CalTask key={`ct-${task.id}`} task={task}/>)
    }

    return (
        <Grid.Column width={2}>
            <Card onClick={handleClick}>
                <Card.Content>
                    <Card.Header>
                        {displayDay}
                    </Card.Header>
                    <Feed>
                        {displayTasks()}
                    </Feed>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}

export default Day;