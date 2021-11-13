import { Button } from '@chakra-ui/button';
import { Field, Form, FormikProps } from 'formik';
import { createField } from '../../formik/helpers';
import { validateNotEmpty } from '../../formik/validators';

export interface LoginProps {
    email: string;
    password: string;
}

type LoginFormikProps = FormikProps<LoginProps>;

export function LoginFormik(props: LoginFormikProps) {
    return (
        <Form>
            <Field name="email" validate={validateNotEmpty}>
                {createField<LoginProps>('email', 'Email', 'email')}
            </Field>
            <Field name="password" validate={validateNotEmpty}>
                {createField<LoginProps>('password', 'Password', 'password')}
            </Field>
            <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
            >
                Login
            </Button>
        </Form>
    );
}
