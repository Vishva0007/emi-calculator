import { Router } from 'express';
import db from '../db.js';
const router = Router();
router.post('/', (req, res) => {
  const { country, amount, tenureMonths, interest, message } = req.body;
  const banks = db.prepare(
    'SELECT name,interest_min FROM banks WHERE country_code = ?'
  ).all(country);
  const betterBanks = banks.filter(b => b.interest_min < interest);
  let reply = '';
  if (/reduce/i.test(message)) {
    reply += 'You can reduce EMI by increasing tenure or making part pre-payments.\n';
  }
  if (betterBanks.length) {
    reply +=
      'Consider these lower-rate banks: ' +
      betterBanks.map(b => `${b.name} (${b.interest_min}%)`).join(', ') + '.';
  }
  if (!reply) reply = 'No better options found; consider renegotiating with your bank.';
  res.json({ reply });
});
export default router;
