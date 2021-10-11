import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import * as socket from 'socket.io';
import path from 'path';
import cors from 'cors';

// Blocking, sync db first then open the server listener
(async () => {
    const app = express();

    var corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true,
    };
    app.use(cors(corsOptions));

    const server = http.createServer(app);
    const socketio = new socket.Server(server, { cors: corsOptions });

    app.get(
        /^\/(?!api).*/,
        express.static(path.join(__dirname, '../../frontend/build'))
    );

    socketio.on('connection', (socket) => {
        socket.on('disconnect', () => {
            console.log(`user disconnec, id=${socket.id}`);
        });

        console.log(`a user connec, id=${socket.id}`);
    });

    const port = 8080;
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
})();
