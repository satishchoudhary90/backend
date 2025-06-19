import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { dbConnect } from './db/dbConnect.js';
import CourseRouter from './routes/courses.route.js';
import InstanceRouter from './routes/instances.route.js';

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/course', CourseRouter);
app.use('/api/instance', InstanceRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  try {
    dbConnect();
    console.log(`Server running at Port No. ${PORT}`);
  } catch (err) {
    console.error('Database connection failed:', err);
  }
});
