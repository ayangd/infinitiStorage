import { callRemote } from './socket';

export interface UserCreationAttributes {
    password: string;
    email: string;
    firstName: string;
    lastName?: string;
    role: string;
}

export interface UserAttributes
    extends Omit<UserCreationAttributes, 'password'> {}

export function login(email: string, password: string) {
    return callRemote<void>('cred/login', { email, password });
}

export function logout() {
    return callRemote<void>('cred/logout');
}

export function register(user: UserCreationAttributes) {
    return callRemote<void>('cred/register', user);
}

export function currentUser() {
    return callRemote<UserAttributes>('cred/currentUser');
}
