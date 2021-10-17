import Login from './layout/login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './layout/navbar';

function App() {
    return (
        <>
            <BrowserRouter basename="/infinitiStorage">
                <Navbar />
                <Switch>
                    <Route path="/login" exact>
                        <Login />
                    </Route>
                    <Route path="/" exact>
                        Hello
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
