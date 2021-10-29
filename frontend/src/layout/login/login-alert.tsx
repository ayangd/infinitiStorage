import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/alert';
import { CloseButton } from '@chakra-ui/close-button';

interface LoginAlertProps {
    error: string;
    reset: () => void;
}
export function LoginAlert({ error, reset }: LoginAlertProps) {
    if (error.length === 0) {
        return <></>;
    }
    return (
        <Alert status="error">
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
            <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={reset}
            />
        </Alert>
    );
}
