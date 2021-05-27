import { ROUTE } from "../Constants/Routes";
import { Home } from "../Views";

const routes = [
  {
    path: ROUTE.HOME,
    exact: true,
    component: Home,
  },
];
export default routes;
