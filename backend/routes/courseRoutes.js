import express from "express";
import { courseValidations } from "../controllers/semesterController.js";
import {
  getCourseById,
  updateCourse,
  deleteCourse,
  getEnrolledStudents,
  gradeStudents,
  gradesValidations,
  getMyCourses
} from "../controllers/courseController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/my").get(protect, getMyCourses);

router
  .route("/:id")
  .get(protect, admin, getCourseById)
  .put(protect, admin, courseValidations, updateCourse)
  .delete(protect, admin, deleteCourse);

router.route("/:id/students").get(protect, admin, getEnrolledStudents);

router
  .route("/:id/grades")
  .post(protect, admin, gradesValidations, gradeStudents);

export default router;
