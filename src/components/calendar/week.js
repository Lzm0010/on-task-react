import React, {Fragment} from 'react';
import Day from './day';

const Week = ({week}) => {
    
    const displayWeek = () => {
        const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return dayArray.map(day => <Day day={day}/>)
    }

    return (
        <Fragment>
            <h6>{week}</h6>
            {displayWeek()}
        </Fragment>
    )
}

export default Week;