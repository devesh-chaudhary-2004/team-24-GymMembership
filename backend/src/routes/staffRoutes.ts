import express from 'express';
import { getAllStaff, createStaff } from '../controllers/staffController';
import { protect, restrictTo } from '../middleware/auth';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router.get('/', getAllStaff);
router.post('/', createStaff);

export default router;

