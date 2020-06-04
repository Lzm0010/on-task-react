import React, {useState} from 'react';
import {Card, List, Confirm} from 'semantic-ui-react';

const Project = ({project, removeProject, removeTask}) => {
    const [open, setOpen] = useState(false);

    const deleteProject = () => {
        project.tasks.forEach(task => {
            removeTask(task)
        });
    
        const projectUrl = `http://localhost:3000/projects/${project.id}`
        const projectObj = {
            'method': 'DELETE',
            'headers': {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
        fetch(projectUrl, projectObj)
        .then(res => res.json())
        .then(project => removeProject(project))
    }

    const handleCancel = () => {
        setOpen(false);
    }
    const handleConfirm = () => {
        deleteProject();
    }
    const handleDelete = () => {
        setOpen(true);
    }

    const handleEdit = () => {

    }

    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    {project.name}
                </Card.Header>
                <Card.Description>
                    Progress Filler
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <List celled horizontal size="mini" floated="right">
                    <List.Item as="a" onClick={handleEdit}>Edit</List.Item>
                    <List.Item as="a" onClick={handleDelete}>Delete</List.Item>
                </List>
                <Confirm
                    open={open}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                    cancelButton='Never mind'
                    confirmButton="Let's do it" 
                    size='mini'
                />
            </Card.Content>
        </Card>
    )
}

export default Project;