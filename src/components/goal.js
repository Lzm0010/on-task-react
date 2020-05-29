import React, {Fragment} from 'react';

const Goal = ({goal}) => {

    return (
        <Fragment>
            {console.log(goal)}
            {goal !== undefined ? (
                <div>{goal.name}</div>
            ) : null}
        </Fragment>
    )
}

export default Goal;