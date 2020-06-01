import React, {useState} from 'react';
import {useInput} from '../hooks/useInput';
import DatePicker from 'react-datepicker';
import { Form, Input } from 'semantic-ui-react';

const ProjectTask = ({step}) => {
    const {value:name, bind:bindName, reset:resetName} = useInput("");
    const {value:stepNum, bind:bindStepNum, reset:resetStepNum} = useInput(step);
    const [date, setDate] = useState(null);

    return (
        <Form.Group>
            <Form.Field
                control={Input}
                label="Task" 
                placeholder="Enter your Task..."
                {...bindName}
            />
            <Form.Field
                control={Input}
                label="Step" 
                placeholder="Enter what step in the project this is.."
                {...bindStepNum}
            />
            <Form.Field required>
                <label>Date</label>
                <DatePicker 
                    selected={date}
                    onChange={date => setDate(date)}
                    placeholderText="Select date.."
                />
            </Form.Field>
        </Form.Group>
    )
}

export default ProjectTask;