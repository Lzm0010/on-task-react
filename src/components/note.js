import React, {useState, useEffect} from 'react';
import { Form, TextArea } from 'semantic-ui-react';

const Note = ({plannerDay, handleChange, note}) => {
    const [content, setContent] = useState("");

    useEffect(() => {
        note !== null ? setContent(note.content) : setContent("");
    }, [note])

    const handleNote = (event) => {
        const content = event.target.value;
        setContent(content);
        handleChange(content);
    }

    return (
        <Form>
            <TextArea onChange={handleNote} value={content} placeholder={plannerDay} style={{minHeight: 500}} data-value="sidebar"/>
        </Form>
    )
}

export default Note;