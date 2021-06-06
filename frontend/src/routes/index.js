import { ROUTE } from "../constants/Routes";
import {
  Home,
  Students,
  AddStudents,
  Departments,
  AddDepartments,
} from "../views";

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
    component: AddStudents,
    isAdmin: true,
  },

  // DEPARTMENT
  {
    path: ROUTE.DEPARTMENTS,
    exact: true,
    component: Departments,
    isAdmin: true,
  },
  {
    path: ROUTE.DEPARTMENTS_ADD,
    exact: true,
    component: AddDepartments,
    isAdmin: true,
  },
];
export default routes;
