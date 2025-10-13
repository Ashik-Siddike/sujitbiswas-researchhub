import { Router } from 'express';
import db from '../db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const TOKEN_EXPIRY = '7d';

function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  try {
    const [rows]: any = await db.query('SELECT id, email, role, password_hash FROM admin_users WHERE email = ? LIMIT 1', [email]);
    const user = rows?.[0];
    if (!user || !user.password_hash) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken({ id: user.id, email: user.email, role: user.role });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
});

router.get('/me', async (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    res.json({ user: { id: decoded.id, email: decoded.email, role: decoded.role } });
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

export default router;



