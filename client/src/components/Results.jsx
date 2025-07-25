export default function Results({ data }) {
  return (
    <div className="mt-6 p-4 rounded bg-green-100 dark:bg-green-900">
      <h2 className="text-lg font-bold mb-2">Results</h2>
      <p>EMI: {data.emi.toFixed(2)}</p>
      <p>Total Interest: {data.totalInterest.toFixed(2)}</p>
      <p>Total Payment: {data.totalPayment.toFixed(2)}</p>
    </div>
  );
}
