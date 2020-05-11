import React from 'react';
import {Card} from 'semantic-ui-react'

const Day = ({day}) => {
    return (
    <Card>
        <Card.Content>
            {day}
        </Card.Content>
    </Card>
    )
}

export default Day;