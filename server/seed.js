import db from './src/db.js';
db.exec(`
CREATE TABLE IF NOT EXISTS countries (
  id INTEGER PRIMARY KEY,
  code TEXT UNIQUE,
  name TEXT,
  currency TEXT
);
CREATE TABLE IF NOT EXISTS banks (
  id INTEGER PRIMARY KEY,
  country_code TEXT,
  name TEXT,
  interest_min REAL,
  interest_max REAL
);
CREATE TABLE IF NOT EXISTS calculations (
  id INTEGER PRIMARY KEY,
  country_code TEXT,
  bank TEXT,
  amount REAL,
  tenure_months INTEGER,
  interest REAL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT OR IGNORE INTO countries(code,name,currency) VALUES
 ('IN','India','INR'),('US','United States','USD'),('GB','United Kingdom','GBP');
INSERT OR IGNORE INTO banks(country_code,name,interest_min,interest_max) VALUES
 ('IN','State Bank of India',7.0,9.0),
 ('IN','HDFC Bank',7.5,9.5),
 ('US','JPMorgan Chase',4.0,6.5),
 ('US','Bank of America',4.2,6.8),
 ('GB','Barclays',3.5,5.5),
 ('GB','HSBC UK',3.8,5.8);
`);
console.log('✔ Seeded database');
process.exit();
