import {Route} from 'react-router-dom';
import IndexPage from '../pages/index';
import InvokePage from '../pages/invoke';
import React from 'react';


const App = () => 
    <div>
        <Route component={InvokePage} path="/invoke/:addr" />
        <Route component={IndexPage} path="/" exact />
    </div>

export default App;
