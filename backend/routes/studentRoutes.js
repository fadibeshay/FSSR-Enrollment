import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js';
import {
  studentValidations,
  createStudent
} from '../controllers/studentController.js';

const router = express.Router();

router.route('/').post(protect, admin, studentValidations, createStudent);

export default router;
