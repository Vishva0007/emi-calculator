import { Router } from 'express';
import db from '../db.js';
const router = Router();
router.get('/', (req, res) => {
  const topCountries = db
    .prepare(`SELECT country_code,count(*) AS cnt FROM calculations GROUP BY country_code ORDER BY cnt DESC LIMIT 5`)
    .all();
  const topBanks = db
    .prepare(`SELECT bank,count(*) AS cnt FROM calculations GROUP BY bank ORDER BY cnt DESC LIMIT 5`)
    .all();
  res.json({ topCountries, topBanks });
});
export default router;
