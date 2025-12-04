import express from 'express';
import { getTrainerClients } from '../controllers/trainerController';
import { protect, restrictTo } from '../middleware/auth';

const router = express.Router();

router.use(protect);
router.use(restrictTo('trainer', 'admin'));

router.get('/clients', getTrainerClients);

export default router;

