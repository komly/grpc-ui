import {Route} from 'react-router-dom';
import InvokePage from './pages/invoke';
import React from 'react';


const App = () =>
    <div>
        <Route render={(props) => <InvokePage key={props.match.params.addr} {...props}/>} path="/:addr?" />
    </div>

export default App;
