import { ROUTE } from "../constants/Routes";
import {
  Home,
  Students,
  AddStudents,
  Departments,
  AddDepartments,
  Subjects,
  AddSubjects,
  Profile,
  Years,
  AddYears,
  Semesters,
  AddSemesters,
  Courses,
  AddCourses,
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
  {
    path: ROUTE.STUDENTS_PROFILE,
    exact: true,
    component: Profile,
    isAdmin: false,
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

  // Subjects
  {
    path: ROUTE.SUBJECTS,
    exact: true,
    component: Subjects,
    isAdmin: true,
  },
  {
    path: ROUTE.SUBJECTS_ADD,
    exact: true,
    component: AddSubjects,
    isAdmin: true,
  },

  // Year
  {
    path: ROUTE.YEARS,
    exact: true,
    component: Years,
    isAdmin: true,
  },
  {
    path: ROUTE.YEARS_ADD,
    exact: true,
    component: AddYears,
    isAdmin: true,
  },

  // SEMESTERS
  {
    path: ROUTE.SEMESTERS,
    exact: true,
    component: Semesters,
    isAdmin: true,
  },
  {
    path: ROUTE.SEMESTERS_ADD,
    exact: true,
    component: AddSemesters,
    isAdmin: true,
  },

  // courses
  {
    path: ROUTE.COURSES,
    exact: true,
    component: Courses,
    isAdmin: true,
  },
  {
    path: ROUTE.COURSES_ADD,
    exact: true,
    component: AddCourses,
    isAdmin: true,
  },
];
export default routes;
