import { Socket } from 'socket.io';
import * as bcrypt from 'bcryptjs';
import {
    User as UserType,
    UserCreationAttributes,
} from '../database/models/user';
import { User } from '../database';

interface LoginParameters {
    email: string;
    password: string;
}

export const sessions: Record<string, number> = {};

export default function listenAuth(socket: Socket) {
    socket.on('disconnect', () => {
        delete sessions[socket.id];
    });

    socket.on('cred/login', ({ email, password }: LoginParameters) => {
        console.log(email, password);
        (async () => {
            const result = await User.findOne({
                where: { email: email },
            });

            if (result === null) {
                socket.emit('cred/login/response', {
                    success: false,
                    message: 'Email not registered',
                });
                return;
            }

            const match = await bcrypt.compare(password, result.password);
            if (!match) {
                socket.emit('cred/login/response', {
                    success: false,
                    message: "Password didn't match",
                });
            }
            sessions[socket.id] = result.id;
            socket.emit('cred/login/response', {
                success: true,
            });
        })();
    });

    socket.on('cred/logout', () => {
        delete sessions[socket.id];
        socket.emit('cred/logout/response', {
            success: false,
        });
    });

    socket.on('cred/register', (newUser: UserCreationAttributes) => {
        (async () => {
            let user!: UserType;
            try {
                const { password, ...newUser_ } = newUser;
                user = await User.create({
                    password: await bcrypt.hash(password, 10),
                    ...newUser_,
                });
            } catch (e) {
                socket.emit('cred/register/response', {
                    success: false,
                    error: e,
                });
                return;
            }
            sessions[socket.id] = user.id;
            socket.emit('cred/register/response', { success: true });
        })();
    });

    socket.on('cred/currentUser', () => {
        if (sessions[socket.id] === undefined) {
            socket.emit('cred/currentUser/response', {
                success: false,
                message: 'Not logged in',
            });
            return;
        }
        User.findByPk(sessions[socket.id]).then((user) => {
            if (user === null) {
                socket.emit('cred/currentUser/response', {
                    success: false,
                    message: 'User not found',
                });
                return;
            }
            socket.emit('cred/register/response', {
                success: true,
                data: {
                    user: {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                    },
                },
            });
        });
    });
}
