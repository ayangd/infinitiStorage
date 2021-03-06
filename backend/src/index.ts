import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import * as socket from 'socket.io';
import path from 'path';
import cors from 'cors';
import listen from './socket';
import compression from 'compression';
import { sequelize } from './database';

// Blocking, sync db first then open the server listener
(async () => {
    await sequelize.sync({
        // force: true,
    });

    const app = express();

    var corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true,
    };
    app.use(cors(corsOptions));

    const server = http.createServer(app);
    const socketio = new socket.Server(server, {
        cors: corsOptions,
        path: '/infinitiStorage/socket',
    });

    const masterRouter = express.Router();
    app.use('/infinitiStorage', masterRouter);

    const staticRouter = express.Router();
    staticRouter.use(compression());
    staticRouter.get(
        /^\/(?!api).*/,
        express.static(path.join(__dirname, '../../frontend/build'), {
            fallthrough: true,
        }),
        (req: Request, res: Response) => {
            res.sendFile('index.html', {
                root: path.join(__dirname, '../../frontend/build'),
            });
        }
    );
    masterRouter.use(staticRouter);

    socketio.on('connection', (socket) => {
        socket.on('disconnect', () => {
            console.log(`user disconnec, id=${socket.id}`);
        });

        listen(socket);

        console.log(`a user connec, id=${socket.id}`);
    });

    const port = 8079;
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
})();
