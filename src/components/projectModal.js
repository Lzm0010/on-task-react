import React, {useState} from 'react';
import {useInput} from '../hooks/useInput';
import DatePicker from 'react-datepicker';
import {Form, Modal, Button, Divider, Input} from 'semantic-ui-react';
import ProjectTasksContainer from '../containers/projectTasksContainer';


const ProjectModal = ({modalOpen, handleClose}) => {
    const {value:name, bind:bindName, reset:resetName} = useInput("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [projectTasks, setProjectTasks] = useState([{name:null, step_number: 1, status: "active", is_completed: false, date: null}]);

    const newProject = () => {
        const projectUrl = `http://localhost:3000/projects`;
        const projObj = {
            'method': 'POST',
            'headers': {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            'body': JSON.stringify({
                name, 
                start_date: startDate,
                end_date: endDate,
                user_id: 1,
                tasks_attributes: projectTasks
            })
        };
        fetch(projectUrl, projObj)
        .then(res => res.json())
        .then(project => {
            // addTask(task)
            console.log(project);
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        newProject();
        handleClose();
        resetName();
        setStartDate(new Date());
        setEndDate(null);
    };

    return(
        <Modal
        centered={false}
        open={modalOpen}
        onClose={handleClose}
        >
            <Modal.Header>Add a Project</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.Group widths="equal">

                        <Form.Field
                            control={Input}
                            label="Project" 
                            placeholder="Enter the name of your project..."
                            required 
                            {...bindName}
                        />
                    </Form.Group>

                    <Form.Group widths='equal'>

                        <Form.Field required>
                            <label>Start Date</label>
                            <DatePicker 
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                            />
                        </Form.Field>

                        <Form.Field required>
                            <label>End Date</label>
                            <DatePicker 
                                selected={endDate}
                                onChange={date => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                placeholderText="Select end date.."
                            />
                        </Form.Field>

                    </Form.Group>
    
                    <ProjectTasksContainer projectTasks={projectTasks} setProjectTasks={setProjectTasks}/>

                    <Divider hidden/>

                    <Button type='submit'>Submit</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )

}

export default ProjectModal;