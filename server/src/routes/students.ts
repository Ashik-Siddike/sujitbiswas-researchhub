import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, degree_type, research_topic, status, start_year, end_year, avatar_url, linkedin_url, created_at, updated_at FROM students ORDER BY start_year DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch students' });
  }
});

router.post('/', async (req, res) => {
  const { name, degree_type, research_topic, status, start_year, end_year, avatar_url, linkedin_url } = req.body || {};
  try {
    await db.execute(
      'INSERT INTO students (id, name, degree_type, research_topic, status, start_year, end_year, avatar_url, linkedin_url) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, degree_type, research_topic, status ?? 'current', start_year, end_year ?? null, avatar_url ?? null, linkedin_url ?? null]
    );
    const [last] = await db.query(
      'SELECT * FROM students WHERE name = ? AND start_year = ? ORDER BY created_at DESC LIMIT 1',
      [name, start_year]
    );
    res.status(201).json(Array.isArray(last) ? last[0] : last);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create student' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, degree_type, research_topic, status, start_year, end_year, avatar_url, linkedin_url } = req.body || {};
  try {
    await db.execute(
      'UPDATE students SET name = ?, degree_type = ?, research_topic = ?, status = ?, start_year = ?, end_year = ?, avatar_url = ?, linkedin_url = ? WHERE id = ?',
      [name, degree_type, research_topic, status ?? 'current', start_year, end_year ?? null, avatar_url ?? null, linkedin_url ?? null, id]
    );
    const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
    res.json(Array.isArray(rows) ? rows[0] : rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update student' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM students WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete student' });
  }
});

export default router;



