import { ROUTE } from '../constants/Routes';
import { Home } from '../views';

const routes = [
  {
    path: ROUTE.HOME,
    exact: true,
    component: Home
  }
];
export default routes;
