import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';

const Planner = ({plannerDay}) => {
    return (
        <Form>
            <TextArea placeholder={plannerDay} style={{minHeight: 500}} />
        </Form>
    )
}

export default Planner;