import React, {useState} from 'react';
import Note from './note';

const Planner = ({plannerDay}) => {
    const notesUrl = "http://localhost:3000/notes" //get and post 
    const [content, setContent] = useState("");
    
    const newNote = () => {
        const noteObj = {
            'method': 'POST',
            'headers': {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            'body': JSON.stringify({content, date:plannerDay})
        }
        fetch(notesUrl, noteObj)
        .then(res => res.json())
        .then(note => setContent(note))
    }
    
    const editNote = (noteId) => {
        const noteUrl = `http://localhost:3000/notes/${noteId}`//edit and delete
        const noteObj = {
            'method': 'PATCH',
            'headers': {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            'body': JSON.stringify({content, date:plannerDay})
        }
        fetch(noteUrl, noteObj)
            .then(res => res.json())
            .then(note => setContent(note))
    }

    const handleChange = () => {
        // if (note) {
        //     editNote(noteId);
        // } else {
        //     newNote();
        // }
    }

    return (
        <Note handleChange={handleChange} plannerDay={plannerDay}/>
    )
}

export default Planner;