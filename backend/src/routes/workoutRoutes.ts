import express from 'express';
import {
  getMyWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkoutStats,
} from '../controllers/workoutController';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';
import Joi from 'joi';

const router = express.Router();

const workoutSchema = Joi.object({
  date: Joi.date().optional(),
  exercises: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        sets: Joi.number().min(1).required(),
        reps: Joi.number().min(1).required(),
        weight: Joi.number().min(0).required(),
        notes: Joi.string().optional(),
      })
    )
    .min(1)
    .required(),
  duration: Joi.number().min(0).required(),
  caloriesBurned: Joi.number().min(0).optional(),
  notes: Joi.string().optional(),
});

router.use(protect);

router.get('/stats', getWorkoutStats);
router.get('/', getMyWorkouts);
router.post('/', validate(workoutSchema), createWorkout);
router.patch('/:id', validate(workoutSchema), updateWorkout);
router.delete('/:id', deleteWorkout);

export default router;

