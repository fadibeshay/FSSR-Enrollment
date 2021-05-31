import express from 'express';
import { courseValidations } from '../controllers/semesterController.js';
import {
  getCourseById,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/:id')
  .get(protect, admin, getCourseById)
  .put(protect, admin, courseValidations, updateCourse)
  .delete(protect, admin, deleteCourse);

export default router;
