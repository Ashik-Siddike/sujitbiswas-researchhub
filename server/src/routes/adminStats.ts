import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const [[pubs]]: any = await db.query('SELECT COUNT(*) as c FROM publications');
    const [[areas]]: any = await db.query('SELECT COUNT(*) as c FROM research_areas');
    const [[projs]]: any = await db.query('SELECT COUNT(*) as c FROM projects');
    const [[courses]]: any = await db.query('SELECT COUNT(*) as c FROM courses');
    const [[students]]: any = await db.query('SELECT COUNT(*) as c FROM students');

    res.json({
      publications: pubs.c || 0,
      researchAreas: areas.c || 0,
      projects: projs.c || 0,
      courses: courses.c || 0,
      students: students.c || 0,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admin stats' });
  }
});

export default router;



