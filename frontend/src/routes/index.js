import { ROUTE } from "../constants/Routes";
import { Home, Students } from "../views";

const routes = [
  {
    path: ROUTE.HOME,
    exact: true,
    component: Home,
  },
  {
    path: ROUTE.STUDENTS,
    exact: true,
    component: Students,
  },
];
export default routes;
