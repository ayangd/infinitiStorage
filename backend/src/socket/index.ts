import { Socket } from 'socket.io';
import listenAuth from './auth';
import _ from 'lodash';

export function socketListenWrap(socket: Socket) {
    return {
        /**
         *
         * @param path channel path
         * @param callback async callback upon receiving data through channel path.
         */
        listen<P = Record<string, string> | undefined, R = void>(
            path: string,
            callback: (param?: P) => Promise<R>
        ) {
            socket.on(path, (param_) => {
                callback(param_)
                    .then((res) => {
                        socket.emit(path + '/response', {
                            success: true,
                            data: res,
                        });
                    })
                    .catch((reason) => {
                        let message: any = undefined;
                        if (reason instanceof Error) {
                            message = reason.message;
                        } else if (typeof reason === 'string') {
                            message = reason;
                        }
                        socket.emit(path + '/response', {
                            success: false,
                            message: message ?? 'Internal server error',
                        });
                    });
            });
        },
        ..._.pick(socket, ['id', 'on']),
    };
}
export type WrappedSocket = ReturnType<typeof socketListenWrap>;

export default function listen(socket: Socket) {
    const wrappedSocket = socketListenWrap(socket);
    listenAuth(wrappedSocket);
}
