export function calculateEMI(P, annualRate, nMonths) {
  const r = annualRate / 12 / 100;
  const emi = (P * r * (1 + r) ** nMonths) / ((1 + r) ** nMonths - 1);
  const totalPayment = emi * nMonths;
  const totalInterest = totalPayment - P;
  return { emi, totalInterest, totalPayment };
}
