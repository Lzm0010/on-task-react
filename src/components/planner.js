import React from 'react';
import Note from './note';

const Planner = ({plannerDay, note, getNote, getNotes}) => {
    const notesUrl = "http://localhost:3000/notes" //get and post 
    
    const newNote = (content) => {
        console.log(content);
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
        .then(note => console.log(note))
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
            newNote(content);
            getNotes();
            getNote(plannerDay);
        }
    }

    return (
        <Note note={note} handleChange={handleChange} plannerDay={plannerDay}/>
    )
}

export default Planner;