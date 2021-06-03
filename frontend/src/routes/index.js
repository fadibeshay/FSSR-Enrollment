import { ROUTE } from "../constants/Routes";
import { Home, Students, addStudents } from "../views";

const routes = [
  {
    path: ROUTE.HOME,
    exact: true,
    component: Home,
  },
  // STUDENTS
  {
    path: ROUTE.STUDENTS,
    exact: true,
    component: Students,
  },
  {
    path: ROUTE.STUDENTS_ADD,
    exact: true,
    component: addStudents,
  },
];
export default routes;
