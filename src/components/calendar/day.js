import React, {useState} from 'react';
import CalTask from './calTask';
import {Segment, Grid, Feed} from 'semantic-ui-react'


const Day = ({day, displayDay, showDay, dailyTasks, projects}) => {
    const today = new Date().getDate(); //will this work if it's single digit day?
    const currMonth = new Date().getMonth() + 1;
    const ifToday = day && parseInt(day.slice(5,6)) === currMonth && parseInt(day.slice(6)) === today;
    const [color] = useState(ifToday ? "teal" : null)

    const handleClick = (e) => {
        showDay(day);
    };

    const displayTasks = () => {
        return dailyTasks.map(task => <CalTask key={`ct-${task.id}`} task={task} projects={projects}/>)
    }

    return (
        <Grid.Column>
            {day ? (
                <Segment basic onClick={handleClick} color={color}>
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