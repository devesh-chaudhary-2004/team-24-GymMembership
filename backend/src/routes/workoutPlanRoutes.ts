import express from 'express';
import {
  getAllPlans,
  createPlan,
  assignPlan,
  updatePlan,
  deletePlan,
} from '../controllers/workoutPlanController';
import { protect, restrictTo } from '../middleware/auth';
import { validate } from '../middleware/validate';
import Joi from 'joi';

const router = express.Router();

const planSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  duration: Joi.string().required(),
  difficulty: Joi.string().valid('Beginner', 'Intermediate', 'Advanced').required(),
  category: Joi.string().valid('strength', 'cardio', 'flexibility', 'mixed').required(),
  exercises: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        sets: Joi.number().min(1).required(),
        reps: Joi.number().min(1).required(),
        weight: Joi.number().min(0).optional(),
        notes: Joi.string().optional(),
      })
    )
    .min(1)
    .required(),
});

const updatePlanSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  duration: Joi.string().optional(),
  difficulty: Joi.string().valid('Beginner', 'Intermediate', 'Advanced').optional(),
  category: Joi.string().valid('strength', 'cardio', 'flexibility', 'mixed').optional(),
  exercises: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        sets: Joi.number().min(1).required(),
        reps: Joi.number().min(1).required(),
        weight: Joi.number().min(0).optional(),
        notes: Joi.string().optional(),
      })
    )
    .optional(),
});

const assignSchema = Joi.object({
  memberId: Joi.string().required(),
});

router.use(protect);

router.get('/', getAllPlans);
router.post('/', restrictTo('trainer', 'admin'), validate(planSchema), createPlan);
router.patch('/:id', restrictTo('trainer', 'admin'), validate(updatePlanSchema), updatePlan);
router.delete('/:id', restrictTo('trainer', 'admin'), deletePlan);
router.post('/:id/assign', restrictTo('trainer', 'admin'), validate(assignSchema), assignPlan);

export default router;

