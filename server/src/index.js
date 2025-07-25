import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import countries from './routes/countries.js';
import banks from './routes/banks.js';
import emi from './routes/emi.js';
import chat from './routes/chat.js';
import analytics from './routes/analytics.js';
import { createPDF } from './utils/pdf.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/countries', countries);
app.use('/api/banks', banks);
app.use('/api/emi', emi);
app.use('/api/chat', chat);
app.use('/api/analytics', analytics);

app.get('/api/pdf', (req, res) => {
  // Expect query params for quick demo
  const { amt, months, rate } = req.query;
  const pdf = createPDF({
    amount: amt,
    tenure: months,
    interest: rate,
    breakdown: { emi: 0, totalInterest: 0, totalPayment: 0 }
  });
  res.setHeader('Content-Type', 'application/pdf');
  pdf.pipe(res);
});
app.get("/", (req, res) => {
  res.send("EMI Calculator Backend is Live ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
