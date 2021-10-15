import { io } from 'socket.io-client';

export const socket = io('http://localhost:8079', {
    path: '/infinitiStorage/socket',
});
