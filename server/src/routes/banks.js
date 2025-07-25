import { Router } from 'express';
import db from '../db.js';
const router = Router();
router.get('/', (req, res) => {
  const { country } = req.query;
  const rows = db.prepare(
    'SELECT id,name,interest_min,interest_max FROM banks WHERE country_code = ?'
  ).all(country);
  res.json(rows);
});
export default router;
