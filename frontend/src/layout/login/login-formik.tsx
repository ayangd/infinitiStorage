import { Button } from '@chakra-ui/button';
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Field, FieldProps, Form, FormikProps } from 'formik';

function createField(fieldName: string, label: string) {
    type createFieldProps = FieldProps<string, { [key: string]: string }>;
    return ({ field, form }: createFieldProps) => (
        <FormControl
            isInvalid={
                form.errors[fieldName] !== undefined &&
                form.touched[fieldName] !== undefined
            }
        >
            <FormLabel htmlFor={fieldName}>{label}</FormLabel>
            <Input
                {...field}
                id={fieldName}
                placeholder={label}
                type={fieldName === 'password' ? 'password' : 'text'}
            />
            <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
        </FormControl>
    );
}

function validateNotEmpty(value: string) {
    if (value.length === 0) {
        return 'This field is required';
    }
    return;
}

export function LoginFormik(
    props: FormikProps<{ email: string; password: string }>
) {
    return (
        <Form>
            <Field name="email" validate={validateNotEmpty}>
                {createField('email', 'Email')}
            </Field>
            <Field name="password" validate={validateNotEmpty}>
                {createField('password', 'Password')}
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
