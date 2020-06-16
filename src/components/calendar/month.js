import React from 'react';
import Week from './week';
import {Grid, Header} from 'semantic-ui-react';

const Month = ({monthId, month, numberOfDays, offset, showDay, projects}) => {

    const displayMonth = () => {
        const weekArray = ["1", "2", "3", "4", "5", "6"];
        return weekArray.map(week => <Week key={`${monthId}-${week}`} monthId={monthId} week={week} numberOfDays={numberOfDays} offset={offset} showDay={showDay} projects={projects}/>)
    }

    const displayHeaders = () => {
        const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return dayArray.map(day => <Grid.Column key={`${monthId}-${day}`} >{day}</Grid.Column>)
    }

    return (
        <Grid celled columns='equal'>
            <Grid.Row centered color="teal">
                <Header as='h2'>{month}</Header>
            </Grid.Row>
            <Grid.Row textAlign="center">
                {displayHeaders()}
            </Grid.Row>
            {displayMonth()}
        </Grid>
    )
}

export default Month;