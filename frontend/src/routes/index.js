import { ROUTE } from "../constants/Routes";
import { Home, Students, addStudents } from "../views";

const routes = [
  {
    path: ROUTE.HOME,
    exact: true,
    component: Home,
    isAdmin: false,
  },
  // STUDENTS
  {
    path: ROUTE.STUDENTS,
    exact: true,
    component: Students,
    isAdmin: true,
  },
  {
    path: ROUTE.STUDENTS_ADD,
    exact: true,
    component: addStudents,
    isAdmin: true,
  },
];
export default routes;
