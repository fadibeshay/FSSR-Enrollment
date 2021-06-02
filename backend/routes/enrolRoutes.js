import express from 'express';
import {
  enrolValidations,
  createEnrol,
  getMyEnrol,
  updateMyEnrol,
  getEnrol,
  updateEnrol,
  deleteEnrol
} from '../controllers/enrolController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, enrolValidations, createEnrol);

router
  .route('/my')
  .get(protect, getMyEnrol)
  .put(protect, enrolValidations, updateMyEnrol);

router
  .route('/:id')
  .get(protect, admin, getEnrol)
  .put(protect, admin, enrolValidations, updateEnrol)
  .delete(protect, admin, deleteEnrol);

export default router;
