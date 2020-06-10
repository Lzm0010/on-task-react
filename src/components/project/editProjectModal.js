import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import {Form, Modal, Button, Divider, Input} from 'semantic-ui-react';
import ProjectTasksContainer from '../../containers/projectTasksContainer';


const EditProjectModal = ({user, modalOpen, handleClose, updateAllTasks, currentProject, updateProject, removeTask}) => {
    const [name, setName] = useState(currentProject.name);
    const [startDate, setStartDate] = useState(new Date(currentProject.start_date));
    const [endDate, setEndDate] = useState(new Date(currentProject.end_date));
    const [projectTasks, setProjectTasks] = useState(currentProject.tasks);

    const editProject = () => {
        const projectUrl = `http://localhost:3000/projects/${currentProject.id}`;
        const token = localStorage.getItem('token')
        const projObj = {
            'method': 'PATCH',
            'headers': {
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            }, 
            'body': JSON.stringify({
                name, 
                start_date: startDate,
                end_date: endDate,
                user_id: user.id,
                tasks_attributes: projectTasks
            })
        };
        fetch(projectUrl, projObj)
        .then(res => res.json())
        .then(project => {
            updateProject(project);
            updateAllTasks(project.tasks);
        })
    }

    const handleName = (e) => {
        const name = e.target.value;
        setName(name)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        editProject();
        handleClose();
    };

    return(
        <Modal
        centered={false}
        open={modalOpen}
        onClose={handleClose}
        >
            <Modal.Header>Edit Project</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.Group widths="equal">

                        <Form.Field
                            control={Input}
                            label="Project" 
                            placeholder="Enter the name of your project..."
                            required 
                            value={name}
                            onChange={handleName}
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
    
                    <ProjectTasksContainer projectTasks={projectTasks} setProjectTasks={setProjectTasks} removeTask={removeTask}/>

                    <Divider hidden/>

                    <Button type='submit'>Submit</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )

}

export default EditProjectModal;