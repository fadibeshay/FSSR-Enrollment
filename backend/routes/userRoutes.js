import express from 'express';
import { authUser, getUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.route('/').get(protect, getUser);

export default router;
