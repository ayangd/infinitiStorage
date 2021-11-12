import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../../lib/auth';
import { useHistory } from 'react-router';
import { Formik } from 'formik';
import {
    CenteredContainer,
    Container,
    Title,
} from '../../components/form-containers';
import { LoginFormik, LoginProps } from './login-formik';
import { LoginAlert } from './login-alert';

function Login() {
    const history = useHistory();
    const [error, setError] = useState('');
    const initialValues = {
        email: '',
        password: '',
    };

    function login(values: LoginProps, setSubmitting: Function) {
        auth.login(values.email, values.password)
            .then(() => history.push('/'))
            .catch((error_) => {
                setError(error_);
                setSubmitting(false);
            });
    }

    return (
        <Container>
            <CenteredContainer>
                <Title>Login</Title>
                <LoginAlert error={error} reset={() => setError('')} />
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, actions) => {
                        login(values, actions.setSubmitting);
                    }}
                >
                    {LoginFormik}
                </Formik>
                <Link to="/register">
                    Doesn't have an account yet? Register here.
                </Link>
            </CenteredContainer>
        </Container>
    );
}

export default Login;
