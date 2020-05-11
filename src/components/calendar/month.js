import React, {Fragment} from 'react';
import Week from './week';

const Month = ({month}) => {
    const displayMonth = () => {
        const weekArray = ["1", "2", "3", "4", "5"];
        return weekArray.map(week => <Week week={week} />)
    }

    return (
        <Fragment>
            <h4>{month}</h4>
            {displayMonth()}
        </Fragment>
    )
}

export default Month;