import React, {useState, useCallback} from 'react';
import ReactCardFlip from 'react-card-flip';
import Login from '../components/auth/login';
import Signup from '../components/auth/signup';
import { Card, Segment, Container } from 'semantic-ui-react';

export default function Auth (props) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlipClick = useCallback(e => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    }, [isFlipped]);

    return (
        <Container>
            <Segment basic padded="very" textAlign="center">
                <Card.Group centered style={{height: '400px'}}>
                    <ReactCardFlip isFlipped={isFlipped}>
                        <Login flip={handleFlipClick} flipDirection="horizontal" flipSpeedBackToFront={0.1} {...props} handleLogin={props.handleLogin}/>
                        <Signup flip={handleFlipClick} flipDirection="horizontal" flipSpeedBackToFront={0.1} {...props} handleLogin={props.handleLogin}/>
                    </ReactCardFlip>
                </Card.Group>
            </Segment>
        </Container>
    );
}