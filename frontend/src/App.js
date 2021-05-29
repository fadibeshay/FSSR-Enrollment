import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import routes from './routes';
import { ROUTE } from './Constants/Routes';

import PrivateRoute from './routes/PrivateRoute';
import { Login } from './views';

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <PrivateRoute
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}

        {/* Public Routes */}
        <Route path={ROUTE.LOGIN} component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
