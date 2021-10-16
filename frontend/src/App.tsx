import React from 'react';
import { socket } from './lib/socket';
import Login from './layout/login';

console.log(socket);

function App() {
    return (
        <>
            <Login />
        </>
    );
}

export default App;
