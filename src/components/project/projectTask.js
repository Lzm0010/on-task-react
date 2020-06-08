import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import { Form, Input, Button, Icon, Segment } from 'semantic-ui-react';

const ProjectTask = ({projectTask, updateProjectTask, removeProjectTask}) => {
    const [name, setName] = useState(projectTask.name || "");
    const [step_number, setStep_number] = useState(projectTask.step_number);
    const [date, setDate] = useState(projectTask.date !== null ? new Date(projectTask.date) : null);

    const controlUpdate = (value) => {
        updateProjectTask({...projectTask, ...value})
    };

    const handleNameChange = (e) => {
        const name = e.target.value
        setName(name);
        controlUpdate({name})
    };

    const handleStepChange = (e) => {
        const step_number = e.target.value
        setStep_number(step_number);
        controlUpdate({step_number})
    };

    const handleDateChange = (date) => {
        setDate(date);
        controlUpdate({date})
    };

    const handleDelete = (event) => {
        removeProjectTask(event, projectTask)
    }

    return (
        <Form.Group>
            <Form.Field
                control={Input}
                label="Task" 
                placeholder="Enter your Task..."
                value={name}
                onChange={handleNameChange}
            />
            <Form.Field
                control={Input}
                label="Step" 
                placeholder="Enter what step in the project this is.."
                value={step_number}
                onChange={handleStepChange}
            />
            <Form.Field required>
                <label>Date</label>
                <DatePicker 
                    selected={date}
                    onChange={date => handleDateChange(date)}
                    placeholderText="Select date.."
                />
            </Form.Field>
            <Segment basic>
                <Button icon size="small" negative style={{height: "90%"}} onClick={handleDelete}>
                    <Icon name="close"/>
                </Button>
            </Segment>
        </Form.Group>
    )
}

export default ProjectTask;