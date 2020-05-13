import React, {Fragment, useState} from 'react';
import CalendarContainer from '../containers/calendarContainer';
import ProgressContainer from '../containers/progressContainer';
import FriendsContainer from '../containers/friendsContainer';
import PlannerContainer from '../containers/plannerContainer';
import {Sidebar, Segment} from 'semantic-ui-react';

const Dashboard = () => {
    const [visible, setVisible] = useState(false);
    const [dimmed, setDimmed] = useState(false);
    const [day, setDay] = useState(0);

    const handlePlanner = (day) => {
        setVisible(true);
        setDimmed(true);
        setDay(day);
    }

    return (
        <Fragment>
            <Sidebar.Pushable as={Segment}>
                <PlannerContainer visible={visible} plannerDay={day}/>
                <Sidebar.Pusher dimmed={dimmed && visible}>
                    <Segment basic>
                        <CalendarContainer showDay={handlePlanner}/>
                        <ProgressContainer/>
                        <FriendsContainer />
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Fragment>
    )
}

export default Dashboard;
