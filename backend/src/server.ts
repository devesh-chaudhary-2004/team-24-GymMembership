import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import { config } from './config/env';
import { connectDB } from './config/database';
import { errorHandler, notFound } from './middleware/errorHandler';

// Routes
import authRoutes from './routes/authRoutes';
import memberRoutes from './routes/memberRoutes';
import workoutRoutes from './routes/workoutRoutes';
import progressRoutes from './routes/progressRoutes';
import sessionRoutes from './routes/sessionRoutes';
import checkInRoutes from './routes/checkInRoutes';
import workoutPlanRoutes from './routes/workoutPlanRoutes';
import staffRoutes from './routes/staffRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import memberHomeRoutes from './routes/memberHomeRoutes';
import trainerRoutes from './routes/trainerRoutes';

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet());
app.use(cors({
  origin: config.frontendUrl || '*',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/checkins', checkInRoutes);
app.use('/api/plans', workoutPlanRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/member-home', memberHomeRoutes);
app.use('/api/trainer', trainerRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${config.nodeEnv} mode`);
});

export default app;

