import { ROUTE } from '../Constants/Routes';
import { Home, Login } from '../views';

const routes = [
  {
    path: ROUTE.HOME,
    exact: true,
    component: Home
  },
  {
    path: ROUTE.LOGIN,
    exact: true,
    component: Login
  }
];
export default routes;
