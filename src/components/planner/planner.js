import React from 'react';
import Note from './note';
import TasksContainer from '../../containers/tasksContainer';
import {Divider, Icon, Header, Sidebar, Segment} from 'semantic-ui-react';

const Planner = ({planner, visible, plannerDay, note, addNote, setCurrentNote, projects}) => {
    
    const newNote = (content) => {
        const notesUrl = "https://thawing-retreat-85272.herokuapp.com/notes"
        const token = localStorage.getItem('token')
        const noteObj = {
            'method': 'POST',
            'headers': {
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            }, 
            'body': JSON.stringify({planner_id: planner.id, content, date:plannerDay})
        }
        fetch(notesUrl, noteObj)
        .then(res => res.json())
        .then(note => {
            addNote(note)
            setCurrentNote(note)
        })
    }
    
    const editNote = (noteId, content) => {
        const noteUrl = `https://thawing-retreat-85272.herokuapp.com/notes/${noteId}`//edit and delete
        const token = localStorage.getItem('token')
        const noteObj = {
            'method': 'PATCH',
            'headers': {
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            }, 
            'body': JSON.stringify({planner_id: planner.id, content, date:plannerDay})
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
        <Sidebar
            as={Segment}
            animation='scale down'
            direction='left'
            visible={visible}
            style={{width: "50%"}}
        >
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name="tasks"/>
                    Tasks
                </Header>
            </Divider>
            <TasksContainer planner={planner} plannerDay={plannerDay} projects={projects}/>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name="pencil"/>
                    Notes
                </Header>
            </Divider>
            <Note note={note} handleChange={handleChange} />
        </Sidebar>
    )
}

export default Planner;