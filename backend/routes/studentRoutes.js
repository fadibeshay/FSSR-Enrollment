import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js';
import {
  studentValidations,
  getStudents,
  createStudent,
  getStudentById
} from '../controllers/studentController.js';

const router = express.Router();

router
  .route('/')
  .get(protect, admin, getStudents)
  .post(protect, admin, studentValidations, createStudent);

router.route('/:id').get(protect, admin, getStudentById);

export default router;
