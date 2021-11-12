import {
    FormControl,
    FormErrorMessage,
    FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { FieldProps } from 'formik';

type InputType =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

export function createField<T>(
    fieldName: keyof T,
    label: string,
    type: InputType
) {
    type createFieldProps = FieldProps<string, T>;
    return ({ field, form }: createFieldProps) => (
        <FormControl
            isInvalid={
                form.errors[fieldName] !== undefined &&
                form.touched[fieldName] !== undefined
            }
        >
            <FormLabel htmlFor={fieldName as string}>{label}</FormLabel>
            <Input
                {...field}
                id={fieldName as string}
                placeholder={label}
                type={type}
            />
            <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
        </FormControl>
    );
}
