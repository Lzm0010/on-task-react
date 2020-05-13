import React from 'react';
import Week from './week';
import {Grid} from 'semantic-ui-react';

const Month = ({month, numberOfDays, offset}) => {

    const displayMonth = () => {
        const weekArray = ["1", "2", "3", "4", "5"];
        return weekArray.map(week => <Week key={`${month}-${week}`} week={week} numberOfDays={numberOfDays} offset={offset}/>)
    }

    const displayHeaders = () => {
        const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return dayArray.map(day => <Grid.Column key={`${month}-${day}`} width={2}>{day}</Grid.Column>)
    }

    return (
        <Grid celled textAlign='center'>
            <Grid.Row>
                <h4>{month}</h4>
            </Grid.Row>
            <Grid.Row>
                {displayHeaders()}
            </Grid.Row>
            {displayMonth()}
        </Grid>
    )
}

export default Month;