import {
    FormControl,
    FormErrorMessage,
    FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { FieldProps } from 'formik';

export function createField<T>(
    fieldName: keyof T,
    label: string,
    type: string
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
