import React from 'react';
import Day from './day';
import {Grid} from 'semantic-ui-react';

const Week = ({week, numberOfDays, offset, showDay}) => {

    const displayWeek = () => {
        const dayArray = [1, 2, 3, 4, 5, 6, 7];

        const getDay = (week, day) => {
            const calendarDay = ((week - 1) * 7) + (day - offset)

            if (calendarDay <= numberOfDays && calendarDay > 0){
                return calendarDay;
            }
        };

        return dayArray.map(day => <Day key={`${week}-${day}`} day={getDay(week,day)} showDay={showDay}/>)
    }
   
    return (
        <Grid.Row>
            {displayWeek()}
        </Grid.Row>
    )
}

export default Week;