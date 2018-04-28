import { Route } from 'react-router-dom';
import React from 'react';
import InvokePage from './pages/invoke';

const App = () => (
  <div>
    <Route
      render={props => <InvokePage key={props.match.params.addr} {...props} />}
      path="/:addr?"
    />
  </div>
);

export default App;
