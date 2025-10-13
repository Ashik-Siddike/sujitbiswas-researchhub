import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, title, authors, journal, year, volume, pages, doi, citations, type, pdf_url, created_at, updated_at FROM publications ORDER BY year DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch publications' });
  }
});

router.post('/', async (req, res) => {
  const { title, authors, journal, year, volume, pages, doi, citations, type, pdf_url } = req.body || {};
  try {
    await db.execute(
      'INSERT INTO publications (id, title, authors, journal, year, volume, pages, doi, citations, type, pdf_url) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, authors, journal, year, volume ?? null, pages ?? null, doi ?? null, citations ?? 0, type ?? 'journal', pdf_url ?? null]
    );
    const [last] = await db.query(
      'SELECT * FROM publications WHERE title = ? AND authors = ? ORDER BY created_at DESC LIMIT 1',
      [title, authors]
    );
    res.status(201).json(Array.isArray(last) ? last[0] : last);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create publication' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, authors, journal, year, volume, pages, doi, citations, type, pdf_url } = req.body || {};
  try {
    await db.execute(
      'UPDATE publications SET title = ?, authors = ?, journal = ?, year = ?, volume = ?, pages = ?, doi = ?, citations = ?, type = ?, pdf_url = ? WHERE id = ?',
      [title, authors, journal, year, volume ?? null, pages ?? null, doi ?? null, citations ?? 0, type ?? 'journal', pdf_url ?? null, id]
    );
    const [rows] = await db.query('SELECT * FROM publications WHERE id = ?', [id]);
    res.json(Array.isArray(rows) ? rows[0] : rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update publication' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM publications WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete publication' });
  }
});

export default router;



