import React from 'react';
import {Card, Grid} from 'semantic-ui-react'

const Day = ({day}) => {
    return (
        <Grid.Column width={2}>
            <Card>
                <Card.Content>
                    {day}
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}

export default Day;