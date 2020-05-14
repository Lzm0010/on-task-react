import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';

const Note = ({plannerDay, handleChange}) => {
    return (
        <Form>
            <TextArea onChange={handleChange} placeholder={plannerDay} style={{minHeight: 500}} data-value="sidebar"/>
        </Form>
    )
}

export default Note;