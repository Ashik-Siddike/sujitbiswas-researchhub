import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, title, description, icon, order_index FROM research_areas ORDER BY order_index ASC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch research areas' });
  }
});

router.post('/', async (req, res) => {
  const { title, description, icon, order_index } = req.body || {};
  try {
    const [result]: any = await db.execute(
      'INSERT INTO research_areas (title, description, icon, order_index) VALUES (?, ?, ?, ?)',
      [title, description, icon, order_index ?? 0]
    );
    const [rows] = await db.query('SELECT * FROM research_areas WHERE id = ?', [result.insertId]);
    res.status(201).json(Array.isArray(rows) ? rows[0] : rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create research area' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, icon, order_index } = req.body || {};
  try {
    await db.execute(
      'UPDATE research_areas SET title = ?, description = ?, icon = ?, order_index = ? WHERE id = ?',
      [title, description, icon, order_index ?? 0, id]
    );
    const [rows] = await db.query('SELECT * FROM research_areas WHERE id = ?', [id]);
    res.json(Array.isArray(rows) ? rows[0] : rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update research area' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM research_areas WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete research area' });
  }
});

export default router;



