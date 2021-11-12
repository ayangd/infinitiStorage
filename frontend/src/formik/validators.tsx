export function validateNotEmpty(value: string) {
    if (value.length === 0) {
        return 'This field is required';
    }
    return;
}
