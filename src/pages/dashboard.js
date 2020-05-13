import React, {Fragment} from 'react';
import CalendarContainer from '../containers/calendarContainer';
import ProgressContainer from '../containers/progressContainer';
import FriendsContainer from '../containers/friendsContainer';
import PlannerContainer from '../containers/plannerContainer';

const Dashboard = () => {
    

    return (
        <Fragment>
            <PlannerContainer />
            <CalendarContainer/>
            <ProgressContainer/>
            <FriendsContainer />
        </Fragment>
    )
}

export default Dashboard;
