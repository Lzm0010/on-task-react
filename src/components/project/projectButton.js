import React from 'react';
import {Button, Icon} from 'semantic-ui-react';

const ProjectButton = ({handleClick}) => {

    const handleAddProject = () => {
       handleClick();
    }

    return (
        <Button floated="right" color="teal" onClick={handleAddProject}>
            <Icon name="plus"/> Project
        </Button>
    )
}

export default ProjectButton;