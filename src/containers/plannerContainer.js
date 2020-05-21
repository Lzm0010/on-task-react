import React from 'react';
import Planner from '../components/planner';
import {Sidebar, Segment} from 'semantic-ui-react';

const PlannerContainer = ({visible, plannerDay, note, addNote, setCurrentNote, tasks, addTask, removeTask, updateTask}) => {
    return (
        <Sidebar
            as={Segment}
            animation='scale down'
            direction='left'
            visible={visible}
            style={{width: "50%"}}
        >
            <Planner plannerDay={plannerDay} note={note} addNote={addNote} setCurrentNote={setCurrentNote} tasks={tasks} addTask={addTask} removeTask={removeTask} updateTask={updateTask}/>
        </Sidebar>
    )
}

export default PlannerContainer;