import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import researchAreas from './routes/researchAreas';
import projects from './routes/projects';
import publications from './routes/publications';
import courses from './routes/courses';
import students from './routes/students';
import profileInfo from './routes/profileInfo';
import adminStats from './routes/adminStats';
import auth from './routes/auth';

const app = express();

app.use(cors({ 
  origin: process.env.CORS_ORIGIN?.split(',') || [
    'http://localhost:5173', 
    'http://localhost:8080',
    'http://localhost:3000'
  ], 
  credentials: false 
}));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'development' });
});

app.use('/api/research-areas', researchAreas);
app.use('/api/projects', projects);
app.use('/api/publications', publications);
app.use('/api/courses', courses);
app.use('/api/students', students);
app.use('/api/profile-info', profileInfo);
app.use('/api/admin/stats', adminStats);
app.use('/api/auth', auth);

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${PORT}`);
});


