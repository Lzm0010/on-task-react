import React, {Fragment, useState, useEffect} from 'react';
import CalendarContainer from '../containers/calendarContainer';
import ProgressContainer from '../containers/progressContainer';
import FriendsContainer from '../containers/friendsContainer';
import PlannerContainer from '../containers/plannerContainer';
import {Sidebar, Segment} from 'semantic-ui-react';

const Dashboard = () => {
    //============== STATE VARIABLES ===================//
    const [visible, setVisible] = useState(false);
    const [dimmed, setDimmed] = useState(false);
    const [day, setDay] = useState(0);
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [dayTasks, setDayTasks] = useState([]);

    //============== NOTE FUNCTIONS ===================//
    const addNote = (note) => {
        setNotes(notes => [...notes, note])
    }

    const getNotes = () => {
        const notesUrl = `http://localhost:3000/notes`;
        fetch(notesUrl)
        .then(res => res.json())
        .then(notes => setNotes(notes))
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

    const getTasks = () => {
        const tasksUrl = `http://localhost:3000/tasks`;
        fetch(tasksUrl)
            .then(res => res.json())
            .then(tasks => setTasks(tasks))
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
        console.log("Updated Tasks: ", updatedTasks);
        console.log("index:", index);
        updatedTasks[index] = task;
        setTasks(updatedTasks);
    }


    //============== USE EFFECT HOOK ===================//

    useEffect(() => {
        getNotes()
        getTasks()
    }, [])

    
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
                    <Segment basic>
                        <CalendarContainer showDay={handlePlanner} tasks={tasks}/>
                        <ProgressContainer/>
                        <FriendsContainer />
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Fragment>
    )
}

export default Dashboard;
