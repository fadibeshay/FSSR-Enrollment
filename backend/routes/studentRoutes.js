import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js';
import { createStudent } from '../controllers/studentController.js';

const router = express.Router();

router.route('/').post(protect, admin, createStudent);

export default router;
