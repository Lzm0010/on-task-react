import React, {Fragment} from 'react';
import Login from '../components/login';
import Signup from '../components/signup';

const Auth = () => {
    return (
        <Fragment>
            <Login />
            <Signup />
        </Fragment>
    )
}

export default Auth;