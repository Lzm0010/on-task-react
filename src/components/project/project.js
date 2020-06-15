import React, {useState, useContext, useEffect} from 'react';
import {TasksContext} from '../../context/tasksContext';
import {Card, List, Confirm, Progress} from 'semantic-ui-react';

const Project = ({project, removeProject, handleEditProjClick, setCurrentProject, formatDate}) => {
    const tasksContext = useContext(TasksContext);
    const {removeTask, tasksCompleted} = tasksContext;
    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(tasksCompleted.filter(task => task.project_id === project.id).length);
    const [total, setTotal] = useState(project.tasks.length);

    useEffect(() => {
        setProgress(tasksCompleted.filter(task => task.project_id === project.id).length)
        setTotal(project.tasks.length)
    }, [tasksCompleted, project.id, project.tasks])

    const deleteProject = () => {
        project.tasks.forEach(task => {
            removeTask(task)
        });
    
        const projectUrl = `http://localhost:3000/projects/${project.id}`
        const token = localStorage.getItem('token')
        const projectObj = {
            'method': 'DELETE',
            'headers': {
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`,
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
        setCurrentProject(project);
        handleEditProjClick();
    }

    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    {project.name}
                </Card.Header>
                <Card.Meta>
                    {formatDate(project.start_date)} - {formatDate(project.end_date)}
                </Card.Meta>
                <Card.Description>
                <Progress value={progress} total={total} progress='ratio' warning/>
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
};

export default Project;