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
    const [note, setNote] = useState("");

    const getNote = (day) => {
        // const noteId = find note by day passed in for now and user later
        // const noteUrl = `http://localhost:3000/notes/${noteId}`/
        // fetch(noteUrl, noteObj)
        //     .then(res => res.json())
        //     .then(note => setNote(note))
    }

    const handlePlanner = (day) => {
        setVisible(true);
        setDimmed(true);
        setDay(day);
        getNote(day);
    }

    const clickOffPlanner = (e) => {
        if (visible && e.target.dataset.value !== "sidebar") {
            setVisible(false);
            setDimmed(false);
        }
    }

    return (
        <Fragment>
            <Sidebar.Pushable as={Segment} onClick={clickOffPlanner}>
                <PlannerContainer visible={visible} plannerDay={day}/>
                <Sidebar.Pusher dimmed={dimmed && visible} >
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
