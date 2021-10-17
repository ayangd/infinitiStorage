import { io } from 'socket.io-client';

type Response<T> =
    | {
          success: true;
          data?: T;
      }
    | {
          success: false;
          message: string;
      };

export function callRemote<R>(url: string, data?: any) {
    return new Promise((resolve: (res: R | void) => void, reject) => {
        socket.once(url + '/response', (response: Response<R>) => {
            if (response.success === true) {
                if (response.data === undefined) {
                    resolve();
                } else {
                    resolve(response.data);
                }
            } else {
                reject(response.message);
            }
        });
        socket.emit(url, data);
    });
}

export const socket = io('/', {
    path: '/infinitiStorage/socket',
});
