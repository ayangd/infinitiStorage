import { socket } from './socket';

export function login(email: string, password: string) {
    socket.emit('cred/login', {
        email: email,
        password: password,
    });
}
