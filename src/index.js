/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import InvokePage from './pages/invoke';


const history = createHistory();

ReactDOM.render((
    <Router history={history}>
        <Route component={InvokePage} path="/invoke/:addr" />
    </Router>
) , document.getElementById('root'));
