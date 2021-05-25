import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const App = () => {

  let routes;

  routes = (
    <Switch>
      <Route path="/" exact>
        <h1>Welcome to signcamp</h1>
      </Route>
      <Route path="/test" exact>
        <h1>How to use the app</h1>
      </Route>
      <Route path="/feedback" exact>
        <h1>Give us your feedback</h1>
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  return (
    <Router>
      <MainNavigation />
      <main>
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
          }
        >
          {routes}
        </Suspense>
      </main>
    </Router>
  );
};

export default App;
