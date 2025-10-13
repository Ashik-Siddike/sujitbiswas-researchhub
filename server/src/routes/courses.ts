import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, code, title, description, level, semester, year, enrollment_count, created_at, updated_at FROM courses ORDER BY year DESC, semester ASC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
});

router.post('/', async (req, res) => {
  const { code, title, description, level, semester, year, enrollment_count } = req.body || {};
  try {
    await db.execute(
      'INSERT INTO courses (id, code, title, description, level, semester, year, enrollment_count) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?)',
      [code, title, description, level, semester, year, enrollment_count ?? 0]
    );
    const [last] = await db.query(
      'SELECT * FROM courses WHERE code = ? AND year = ? ORDER BY created_at DESC LIMIT 1',
      [code, year]
    );
    res.status(201).json(Array.isArray(last) ? last[0] : last);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create course' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { code, title, description, level, semester, year, enrollment_count } = req.body || {};
  try {
    await db.execute(
      'UPDATE courses SET code = ?, title = ?, description = ?, level = ?, semester = ?, year = ?, enrollment_count = ? WHERE id = ?',
      [code, title, description, level, semester, year, enrollment_count ?? 0, id]
    );
    const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
    res.json(Array.isArray(rows) ? rows[0] : rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update course' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM courses WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete course' });
  }
});

export default router;



