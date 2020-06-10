import React from 'react';
import {useHistory} from 'react-router-dom';
import {useInput} from '../../hooks/useInput';
import {Button, Form, Card, Input} from 'semantic-ui-react';

export default function Signup (props) {
    const history = useHistory()

    const {value:username, bind:bindUsername} = useInput("");
    const {value:email, bind:bindEmail} = useInput("");
    const {value:password, bind:bindPassword} = useInput("");
    const {value:passwordConfirm, bind:bindPasswordConfirm} = useInput("");

    const signup = (user) => {
        const signupUrl = "http://localhost:3000/users";
        const postObj = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            'body': JSON.stringify({user})
        }

        return fetch(signupUrl, postObj)
                .then(res => res.json())
                .then(user => {
                    localStorage.setItem('token', user.jwt)
                    props.handleLogin(user.user, user.planner)
                })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        signup({username, email, password, passwordConfirm})
            .then(() => history.push('/dashboard'))
    }

    return (
            <Card>
                <Card.Content textAlign="center">
                    <Form onSubmit={handleSubmit}>
                        <Form.Field
                            control={Input}
                            label="Username" 
                            placeholder="Enter a username.."
                            required 
                            {...bindUsername}
                        />
                        <Form.Field
                            control={Input}
                            label="Email" 
                            placeholder="Enter your email (for gmail collab).."
                            required 
                            {...bindEmail}
                        />
                        <Form.Field
                            control={Input}
                            label="Password" 
                            placeholder="Enter password.."
                            required 
                            {...bindPassword}
                        />
                        <Form.Field
                            control={Input}
                            label="Password Confirmation" 
                            placeholder="Confirm your password."
                            required 
                            {...bindPasswordConfirm}
                        />
                        <Button.Group color="olive">
                            <Button type="submit">Signup</Button>
                            <Button onClick={props.flip}>Login</Button>
                        </Button.Group>
                    </Form>
                </Card.Content>
            </Card>
    );
}