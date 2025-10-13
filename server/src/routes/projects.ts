import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const [rows]: any = await db.query(
      'SELECT id, title, description, status, duration, collaborators, funding, outcomes, created_at, updated_at FROM projects ORDER BY created_at DESC'
    );
    // Parse JSON fields
    const parsed = rows.map((row: any) => ({
      ...row,
      collaborators: typeof row.collaborators === 'string' ? JSON.parse(row.collaborators) : row.collaborators,
      outcomes: typeof row.outcomes === 'string' ? JSON.parse(row.outcomes) : row.outcomes,
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
});

router.post('/', async (req, res) => {
  const { title, description, status, duration, collaborators, funding, outcomes } = req.body || {};
  try {
    const [result]: any = await db.execute(
      'INSERT INTO projects (id, title, description, status, duration, collaborators, funding, outcomes) VALUES (UUID(), ?, ?, ?, ?, CAST(? AS JSON), ?, CAST(? AS JSON))',
      [title, description, status, duration, JSON.stringify(collaborators || []), funding, JSON.stringify(outcomes || [])]
    );
    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [result.insertId ?? null]);
    // Fallback: fetch last inserted by data if insertId is not applicable (UUID)
    if (Array.isArray(rows) && rows.length === 0) {
      const [last] = await db.query(
        'SELECT * FROM projects WHERE title = ? AND description = ? ORDER BY created_at DESC LIMIT 1',
        [title, description]
      );
      return res.status(201).json(Array.isArray(last) ? last[0] : last);
    }
    res.status(201).json(Array.isArray(rows) ? rows[0] : rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create project' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status, duration, collaborators, funding, outcomes } = req.body || {};
  try {
    await db.execute(
      'UPDATE projects SET title = ?, description = ?, status = ?, duration = ?, collaborators = CAST(? AS JSON), funding = ?, outcomes = CAST(? AS JSON) WHERE id = ?',
      [title, description, status, duration, JSON.stringify(collaborators || []), funding, JSON.stringify(outcomes || []), id]
    );
    const [rows]: any = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
    const project = Array.isArray(rows) ? rows[0] : rows;
    // Parse JSON fields
    if (project) {
      project.collaborators = typeof project.collaborators === 'string' ? JSON.parse(project.collaborators) : project.collaborators;
      project.outcomes = typeof project.outcomes === 'string' ? JSON.parse(project.outcomes) : project.outcomes;
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update project' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM projects WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete project' });
  }
});

export default router;



