import React, {Fragment, useState} from 'react';
import CalendarContainer from '../containers/calendarContainer';
import ProgressContainer from '../containers/progressContainer';
import FriendsContainer from '../containers/friendsContainer';
import PlannerContainer from '../containers/plannerContainer';
import {Sidebar, Segment, Grid} from 'semantic-ui-react';

const Dashboard = ({notes, setNotes, tasks, setTasks, goals, setGoals, projects, setProjects}) => {
    //============== STATE VARIABLES ===================//
    const [visible, setVisible] = useState(false);
    const [dimmed, setDimmed] = useState(false);
    const [day, setDay] = useState(0);
    const [currentNote, setCurrentNote] = useState(null);
    const [dayTasks, setDayTasks] = useState([]);

    //============== GOAL FUNCTIONS ===================//
    const addGoal = () => {
        
    }

    //============== NOTE FUNCTIONS ===================//
    const addNote = (note) => {
        setNotes(notes => [...notes, note])
    }

    const getNote = (day) => {
        let noteId = notes.find(note => {
            const noteDate = note.date.slice(0,10).replace(/-/g, "");
            return noteDate === day
        }); 
    
        if (noteId){
            noteId = noteId.id
            const noteUrl = `http://localhost:3000/notes/${noteId}`;
            fetch(noteUrl)
            .then(res => res.json())
            .then(note => setCurrentNote(note));
        } else {
            setCurrentNote(null);
        }
    } 

    //============== TASK FUNCTIONS ===================//
    const addTask = (task) => {
        setTasks(tasks => [...tasks, task])
        setDayTasks(tasks => [...tasks, task])
    }

    const getTasksByDay = (day) => {
        const dayTasks = tasks.filter(task => {
            const taskDate = task.date.slice(0,10).replace(/-/g, "");
            return taskDate === day 
        })
        setDayTasks(dayTasks);
    }

    const removeTask = (task) => {
        setTasks(tasks => tasks.filter(dTask => dTask.id !== task.id))
        setDayTasks(tasks => tasks.filter(dTask => dTask.id !== task.id))
    }

    const updateTask = (task) => {
        const updatedTasks = [...tasks];
        const index = updatedTasks.findIndex(taskToUpdate => taskToUpdate.id === task.id)
        updatedTasks[index] = task;
        setTasks(updatedTasks);
    }

    //============== EVENT FUNCTIONS (PLANNER) ===================//
    const handlePlanner = (day) => {
        setVisible(true);
        setDimmed(true);
        setDay(day);
        getTasksByDay(day);
        getNote(day);
    }

    const clickOffPlanner = (e) => {
        if ((visible && e.target.className === "ui segment pushable") || e.target.className === "pusher dimmed") {
            setVisible(false);
            setDimmed(false);
            setDay(0);
            setCurrentNote(null);
        }
    }

    //============== RENDERING FUNCTION ===================//

    return (
        <Fragment>
            <Sidebar.Pushable as={Segment} onClick={clickOffPlanner}>
                <PlannerContainer visible={visible} plannerDay={day} note={currentNote} setCurrentNote={setCurrentNote} addNote={addNote} tasks={dayTasks} addTask={addTask} removeTask={removeTask} updateTask={updateTask} />
                <Sidebar.Pusher dimmed={dimmed && visible}>
                    <Grid columns={2}>
                        <Grid.Row stretched>

                            <Grid.Column width={12}>
                                <Segment basic>
                                    <CalendarContainer showDay={handlePlanner} tasks={tasks}/>
                                </Segment>
                            </Grid.Column>

                            <Grid.Column width={4}>
                                <Segment>
                                    <ProgressContainer goals={goals} projects={projects}/>
                                </Segment>
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Fragment>
    )
}

export default Dashboard;
