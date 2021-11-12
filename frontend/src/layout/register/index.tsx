import { useState } from 'react';
import * as auth from '../../lib/auth';
import { useHistory } from 'react-router';
import {
    CenteredContainer,
    Container,
    Title,
} from '../../components/form-containers';
import { LoginAlert } from '../login/login-alert';
import { Formik } from 'formik';
import { RegisterFormik, RegisterProps } from './register-formik';
import _ from 'lodash';

function Register() {
    const history = useHistory();
    const [error, setError] = useState('');
    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    };

    function register(
        values: RegisterProps,
        setSubmitting: (submitting: boolean) => void
    ) {
        if (values.password !== values.confirmPassword) {
            setError("Password and Confirm Password didn't match");
            return;
        }
        auth.register(_.omit(values, ['confirmPassword']))
            .then(() => history.push('/'))
            .catch((error_) => {
                setError(error_);
                setSubmitting(false);
            });
    }

    return (
        <Container>
            <CenteredContainer>
                <Title>Register</Title>
                <LoginAlert error={error} reset={() => setError('')} />
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, actions) =>
                        register(values, actions.setSubmitting)
                    }
                >
                    {RegisterFormik}
                </Formik>
            </CenteredContainer>
        </Container>
    );
}

export default Register;
