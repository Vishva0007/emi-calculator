import PDFDocument from 'pdfkit';
export function createPDF({ amount, tenure, interest, breakdown }) {
  const doc = new PDFDocument();
  doc.fontSize(18).text('EMI Report', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Loan Amount: ${amount}`);
  doc.text(`Tenure (months): ${tenure}`);
  doc.text(`Interest Rate: ${interest}%`);
  doc.moveDown();
  doc.text(`EMI: ${breakdown.emi.toFixed(2)}`);
  doc.text(`Total Interest: ${breakdown.totalInterest.toFixed(2)}`);
  doc.text(`Total Payment: ${breakdown.totalPayment.toFixed(2)}`);
  doc.end();
  return doc;
}
