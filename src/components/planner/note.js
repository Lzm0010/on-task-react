import React, {useState, useEffect} from 'react';
import { Form, TextArea, Segment } from 'semantic-ui-react';

const Note = ({handleChange, note}) => {
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
        <Segment raised>
            <Form>
                <TextArea onChange={handleNote} value={content} placeholder="Notes..." style={{minHeight: 300}}/>
            </Form>
        </Segment>
    )
}

export default Note;