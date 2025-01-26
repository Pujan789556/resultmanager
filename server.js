import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDB } from './config/db.js';
import studentRouter from './routes/students.js';
import subjectRouter from './routes/subjects.js';
import examRouter from './routes/exams.js';
import resultRouter from './routes/results.js';
import authRouter from './routes/auth.js';

const app = express();
app.use(express.json());
app.use('/api/students', studentRouter);
app.use('/api/subjects', subjectRouter);
app.use('/api/exams', examRouter);
app.use('/api/results', resultRouter);
app.use('/auth', authRouter);
connectDB();
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Running on port: ${process.env.PORT}`);
});
