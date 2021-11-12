import { Button } from '@chakra-ui/button';
import { Field, Form, FormikProps } from 'formik';
import { createField } from '../../formik/helpers';
import { validateNotEmpty } from '../../formik/validators';

export interface RegisterProps {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

type RegisterFormikProps = FormikProps<RegisterProps>;

export function RegisterFormik(props: RegisterFormikProps) {
    return (
        <Form>
            <Field name="email" validate={validateNotEmpty}>
                {createField('email', 'Email', 'email')}
            </Field>
            <Field name="password" validate={validateNotEmpty}>
                {createField('password', 'Password', 'password')}
            </Field>
            <Field name="confirmPassword" validate={validateNotEmpty}>
                {createField('confirmPassword', 'Confirm Password', 'password')}
            </Field>
            <Field name="firstName" validate={validateNotEmpty}>
                {createField('firstName', 'First Name', 'text')}
            </Field>
            <Field name="lastName" validate={validateNotEmpty}>
                {createField('lastName', 'Last Name', 'text')}
            </Field>
            <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
            >
                Register
            </Button>
        </Form>
    );
}
