import { useEffect, useState } from 'react';
import { callRemote } from './socket';
import EventEmitter from 'events';

export interface UserCreationAttributes {
    password: string;
    email: string;
    firstName: string;
    lastName?: string;
}

export interface UserAttributes
    extends Omit<UserCreationAttributes, 'password'> {}

let user: UserAttributes | null = null;
const UserEventEmitter = new EventEmitter();

export function useUser() {
    const [user_, setUser] = useState<UserAttributes | null>(null);

    useEffect(() => {
        let mounted = true;

        async function getCurrentUser() {
            let user__: UserAttributes | null;
            try {
                user__ = await currentUser();
            } catch (e) {
                if (typeof e === 'string' && e === 'Not logged in') {
                    return;
                }
                throw e;
            }
            if (mounted) {
                setUser(user__);
            }
        }

        UserEventEmitter.on('change', getCurrentUser);
        getCurrentUser();

        return () => {
            UserEventEmitter.off('change', getCurrentUser);
            mounted = false;
        };
    }, []);

    return user_;
}

export async function login(email: string, password: string) {
    await callRemote<void>('cred/login', { email, password });
    UserEventEmitter.emit('change');
}

export async function logout() {
    await callRemote<void>('cred/logout');
    user = null;
    UserEventEmitter.emit('change');
}

export async function register(user: UserCreationAttributes) {
    await callRemote<void>('cred/register', user);
    UserEventEmitter.emit('change');
}

export async function currentUser() {
    if (user === null) {
        try {
            const user_ = (await callRemote<{ user: UserAttributes }>(
                'cred/currentUser'
            )) as { user: UserAttributes };
            user = user_.user;
        } catch (e) {
            user = null;
        }
        return user;
    } else {
        return user;
    }
}
