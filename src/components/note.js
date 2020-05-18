import React, {useState} from 'react';
import { Form, TextArea } from 'semantic-ui-react';

const Note = ({plannerDay, handleChange, note}) => {
    const initialContent = note ? note.content : "";
    const [content, setContent] = useState(initialContent);

    const handleNote = (event) => {
        setContent(event.target.value);
        handleChange(content);
    }

    return (
        <Form>
            <TextArea onChange={handleNote} value={content} placeholder={plannerDay} style={{minHeight: 500}} data-value="sidebar"/>
        </Form>
    )
}

export default Note;