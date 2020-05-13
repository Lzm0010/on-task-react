import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';

const Planner = () => {
    return (
        <Form>
            <TextArea placeholder={"Sup"} style={{minHeight: 200}} />
        </Form>
    )
}

export default Planner;