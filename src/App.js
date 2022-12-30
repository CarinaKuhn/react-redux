import React from 'react';
import Home from './pages/home/index';
import Cart from './pages/cart/cart';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <>
                <Router>
                    <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/cart/:id" render={({match}) => (
                        <Cart id={match.params.id} />
                    )} />
                    
                    </Switch>
                </Router>
            </>
        );
    }
}

export default App;