import React from 'react';
import CalTask from './calTask';
import {Segment, Grid, Feed} from 'semantic-ui-react'


const Day = ({day, displayDay, showDay, dailyTasks, projects}) => {

    const handleClick = (e) => {
        showDay(day);
    };

    const displayTasks = () => {
        return dailyTasks.map(task => <CalTask key={`ct-${task.id}`} task={task} projects={projects}/>)
    }

    return (
        <Grid.Column>
            {day ? (
                <Segment basic onClick={handleClick}>
                    <Feed>
                        <Feed.Date>
                            {displayDay}
                        </Feed.Date>
                        <Feed.Extra>
                            {displayTasks()}
                        </Feed.Extra>
                    </Feed>
                </Segment>
            ) 
            : (
                null
            )}
        </Grid.Column>
    )
}

export default Day;