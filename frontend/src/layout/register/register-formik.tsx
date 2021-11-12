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
    // Hacky password match validation
    const [validatePassword, validateConfirmPassword] = (() => {
        let password = '';
        function validatePassword(value: string) {
            password = value;
            return validateNotEmpty(value);
        }
        function validateConfirmPassword(value: string) {
            const validation = validateNotEmpty(value);
            if (validation !== undefined) {
                return validation;
            }
            console.log(password, value);
            if (password !== value) {
                return "Password didn't match.";
            }
        }
        return [validatePassword, validateConfirmPassword];
    })();

    return (
        <Form>
            <Field name="email" validate={validateNotEmpty}>
                {createField('email', 'Email', 'email')}
            </Field>
            <Field name="password" validate={validatePassword}>
                {createField('password', 'Password', 'password')}
            </Field>
            <Field name="confirmPassword" validate={validateConfirmPassword}>
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
