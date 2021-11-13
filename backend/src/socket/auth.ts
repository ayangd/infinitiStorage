import * as bcrypt from 'bcryptjs';
import {
    User as UserType,
    UserCreationAttributes,
} from '../database/models/user';
import { User } from '../database';
import { assertion } from './assertion';
import { WrappedSocket } from '.';
import _ from 'lodash';

interface LoginParameters {
    email: string;
    password: string;
}

export const sessions: Record<string, number> = {};

export default function listenAuth(socket: WrappedSocket) {
    socket.on('disconnect', () => {
        delete sessions[socket.id];
    });

    socket.listen<LoginParameters>('cred/login', async (loginParameters) => {
        if (loginParameters === undefined) {
            throw 'Expected parameters';
        }
        const loginParametersAssertion = assertion(loginParameters);
        const assertionPassing =
            loginParametersAssertion.shouldBeTyped('object') &&
            assertion(loginParameters).shouldHaveProperties(
                'email',
                'password'
            );
        if (!assertionPassing) {
            throw 'Bad Request';
        }
        const { email, password } = loginParameters;
        const resultModel = await User.findOne({
            where: { email: email },
        });

        if (resultModel === null) {
            throw 'Email not registered';
        }
        const result = resultModel.get();

        const match = await bcrypt.compare(password, result.password);
        if (!match) {
            throw "Password didn't match";
        }
        sessions[socket.id] = result.id;
    });

    socket.listen('cred/logout', async () => {
        delete sessions[socket.id];
        return;
    });

    socket.listen<UserCreationAttributes>('cred/register', async (newUser) => {
        let user!: UserType;
        if (newUser === undefined) {
            throw 'Expected parameters';
        }
        const { password, ...newUser_ } = newUser;
        user = await User.create({
            password: await bcrypt.hash(password, 10),
            ...newUser_,
        });
        sessions[socket.id] = user.id;
    });

    socket.listen('cred/currentUser', async () => {
        const session = sessions[socket.id];
        if (session === undefined) {
            throw 'Not logged in';
        }
        const userModel = await User.findByPk(session);
        if (userModel === null) {
            throw 'User not found';
        }
        const user = userModel.get();
        return { user: _.pick(user, ['email', 'firstName', 'lastName']) };
    });
}
