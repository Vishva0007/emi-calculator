import { Router } from 'express';
import db from '../db.js';
const router = Router();
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT code,name,currency FROM countries').all();
  res.json(rows);
});
export default router;
