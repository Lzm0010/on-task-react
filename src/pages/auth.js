import React, {Fragment} from 'react';
import Login from '../components/auth/login';
import Signup from '../components/auth/signup';

const Auth = () => {
    return (
        <Fragment>
            <Login />
            <Signup />
        </Fragment>
    )
}

export default Auth;