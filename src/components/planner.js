import React, {Fragment} from 'react';
import Note from './note';
import TasksContainer from '../containers/tasksContainer';
import {Divider, Icon, Header} from 'semantic-ui-react';

const Planner = ({plannerDay, note, addNote, setCurrentNote, tasks, addTask, removeTask, updateTask}) => {
    const notesUrl = "http://localhost:3000/notes" //get and post 
    
    const newNote = (content) => {
        const noteObj = {
            'method': 'POST',
            'headers': {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            'body': JSON.stringify({planner_id: 1, content, date:plannerDay})
        }
        fetch(notesUrl, noteObj)
        .then(res => res.json())
        .then(note => {
            addNote(note)
            setCurrentNote(note)
        })
    }
    
    const editNote = (noteId, content) => {
        const noteUrl = `http://localhost:3000/notes/${noteId}`//edit and delete
        const noteObj = {
            'method': 'PATCH',
            'headers': {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            'body': JSON.stringify({planner_id: 1, content, date:plannerDay})
        }
        fetch(noteUrl, noteObj)
        .then(res => res.json())
        .then(note => console.log(note))
    }

    const handleChange = (content) => {
        if (note) {
            console.log("Now i'm editing...")
            editNote(note.id, content);
        } else {
            console.log("I'm a new note!")
            newNote(content);
        }
    }

    return (
        <Fragment>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name="tasks"/>
                    Tasks
                </Header>
            </Divider>
            <TasksContainer tasks={tasks} addTask={addTask} removeTask={removeTask} updateTask={updateTask} plannerDay={plannerDay}/>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name="pencil"/>
                    Notes
                </Header>
            </Divider>
            <Note note={note} handleChange={handleChange} />
        </Fragment>
    )
}

export default Planner;