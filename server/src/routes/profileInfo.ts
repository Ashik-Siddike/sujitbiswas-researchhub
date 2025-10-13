import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const [rows] = await db.query('SELECT id, `key`, `value`, created_at, updated_at FROM profile_info ORDER BY `key` ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile info' });
  }
});

router.post('/', async (req, res) => {
  const { key, value } = req.body || {};
  try {
    await db.execute('INSERT INTO profile_info (id, `key`, `value`) VALUES (UUID(), ?, ?)', [key, value]);
    const [last] = await db.query('SELECT * FROM profile_info WHERE `key` = ? ORDER BY created_at DESC LIMIT 1', [key]);
    res.status(201).json(Array.isArray(last) ? last[0] : last);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create profile info' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { key, value } = req.body || {};
  try {
    await db.execute('UPDATE profile_info SET `key` = ?, `value` = ? WHERE id = ?', [key, value, id]);
    const [rows] = await db.query('SELECT * FROM profile_info WHERE id = ?', [id]);
    res.json(Array.isArray(rows) ? rows[0] : rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile info' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM profile_info WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete profile info' });
  }
});

export default router;



