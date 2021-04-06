import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddJuegos from './AddJuegos';
import Home from './Home';
import NavbarPage from './Navbar';

const Inicio = () => {
    return (
        <div>
            <BrowserRouter>
                <NavbarPage />
                <Switch>
                    <Route path='/home'>
                        <Home />
                    </Route>
                    <Route path='/addGames'>
                        <AddJuegos />
                    </Route>
                </Switch>
            </BrowserRouter>


        </div>
    );
}

export default Inicio;
