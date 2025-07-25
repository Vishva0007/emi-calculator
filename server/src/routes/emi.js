import { Router } from 'express';
import db from '../db.js';
import { calculateEMI } from '../utils/emi.js';
const router = Router();
router.post('/', (req, res) => {
  const { country, bank, amount, tenureMonths, interest } = req.body;
  const breakdown = calculateEMI(amount, interest, tenureMonths);
  // log for analytics
  db.prepare(
    `INSERT INTO calculations(country_code,bank,amount,tenure_months,interest)
     VALUES (?,?,?,?,?)`
  ).run(country, bank, amount, tenureMonths, interest);
  res.json(breakdown);
});
export default router;
