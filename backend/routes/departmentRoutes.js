import express from 'express';
import {
  departValidations,
  createDepart,
  getDepartById,
  updateDepart,
  deleteDepart,
  addSubToDepart,
  removeSubFromDepart,
  getDeparts
} from '../controllers/departmentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(protect, admin, getDeparts)
  .post(protect, admin, departValidations, createDepart);

router
  .route('/:id')
  .get(protect, admin, getDepartById)
  .put(protect, admin, departValidations, updateDepart)
  .delete(protect, admin, deleteDepart);

router
  .route('/:id/subjects')
  .put(protect, admin, addSubToDepart)
  .delete(protect, admin, removeSubFromDepart);

export default router;
