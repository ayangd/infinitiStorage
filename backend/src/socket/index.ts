import { Socket } from 'socket.io';
import listenAuth from './auth';

export default function listen(socket: Socket) {
    listenAuth(socket);
}
