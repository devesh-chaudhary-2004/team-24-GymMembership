import express from 'express';
import {
  getAvailableSessions,
  getMyBookings,
  bookSession,
  cancelBooking,
  createSession,
  getTrainerSessions,
  updateSession,
  deleteSession,
} from '../controllers/sessionController';
import { protect, restrictTo } from '../middleware/auth';
import { validate } from '../middleware/validate';
import Joi from 'joi';

const router = express.Router();

const bookSessionSchema = Joi.object({
  sessionId: Joi.string().required(),
});

const sessionSchema = Joi.object({
  type: Joi.string().required(),
  date: Joi.date().required(),
  time: Joi.string().required(),
  duration: Joi.number().min(0).required(),
  maxSpots: Joi.number().min(1).required(),
  status: Joi.string().valid('scheduled', 'completed', 'cancelled').optional(),
});

router.use(protect);

router.get('/available', getAvailableSessions);
router.get('/my-bookings', getMyBookings);
router.get('/trainer', restrictTo('trainer', 'admin'), getTrainerSessions);
router.post('/book', validate(bookSessionSchema), bookSession);
router.post('/', restrictTo('trainer', 'admin'), validate(sessionSchema), createSession);
router.patch('/cancel/:id', cancelBooking);
router.patch('/:id', restrictTo('trainer', 'admin'), validate(sessionSchema), updateSession);
router.delete('/:id', restrictTo('trainer', 'admin'), deleteSession);

export default router;

