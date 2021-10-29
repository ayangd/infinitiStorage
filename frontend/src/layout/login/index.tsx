import { useState } from 'react';
import * as auth from '../../lib/auth';
import { useHistory } from 'react-router';
import { Formik } from 'formik';
import { CenteredContainer, Container, Title } from './container-components';
import { LoginFormik } from './login-formik';
import { LoginAlert } from './login-alert';

function Login() {
    const history = useHistory();
    const [error, setError] = useState('');

    function login(email: string, password: string, setSubmitting: Function) {
        auth.login(email, password)
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
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values, actions) => {
                        login(
                            values.email,
                            values.password,
                            actions.setSubmitting
                        );
                    }}
                >
                    {LoginFormik}
                </Formik>
            </CenteredContainer>
        </Container>
    );
}

export default Login;
