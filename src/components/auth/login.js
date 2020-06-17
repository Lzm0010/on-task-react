import React, {useContext} from 'react';
import {TasksContext} from '../../context/tasksContext';
import {useHistory} from 'react-router-dom';
import {useInput} from '../../hooks/useInput';
import {Button, Form, Card, Input} from 'semantic-ui-react';

export default function Login (props) {
    const history = useHistory()
    const tasksContext = useContext(TasksContext);
    const {getTasks} = tasksContext;

    const {value:username, bind:bindUsername} = useInput("");
    const {value:password, bind:bindPassword} = useInput("");

    const login = (user) => {
        const loginUrl = "http://localhost:3000/login";
        const postObj = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            'body': JSON.stringify({user})
        }

        return fetch(loginUrl, postObj)
                .then(res => res.json())
                .then(user => {
                    localStorage.setItem('token', user.jwt)
                    props.handleLogin(user.user, user.planner)
                    getTasks();
                })
                .catch(err => {
                    if (err.response.status === 401){
                        console.log("something wong")
                    }
                })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        login({username, password})
            .then(() => history.push('/dashboard'))
    }

    return (
        <Card raised color="teal">
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
                        type="password"
                        label="Password" 
                        placeholder="Enter password.."
                        required
                        {...bindPassword}
                    />
                    <Button.Group color="olive">
                        <Button type="submit">Login</Button>
                        <Button onClick={props.flip}>Signup</Button>
                    </Button.Group>
                </Form>
            </Card.Content>
        </Card>

    );
}