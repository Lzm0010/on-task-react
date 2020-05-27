import React from 'react';
import {Button, Icon} from 'semantic-ui-react';

const ProjectButton = () => {
    const projectUrl = `http://localhost:3000/projects`;

    const newProject = () => {
        const projectObj = {
            'method': 'POST',
            'headers': {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            'body': JSON.stringify({name:null})
        }
        fetch(projectUrl, projectObj)
        .then(res => res.json())
        .then(project => {
            // addTask(task)
            console.log(project);
        })
    }

    const handleClick = () => {
       newProject();
    }

    return (
        <Button color="teal" onClick={handleClick}>
            <Icon name="plus"/> Project
        </Button>
    )
}

export default ProjectButton;