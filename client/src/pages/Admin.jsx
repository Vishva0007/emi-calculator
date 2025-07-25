import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Admin() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get('/api/analytics').then(res => setData(res.data));
  }, []);
  if (!data) return null;
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Analytics</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h3 className="font-semibold mb-2">Top Countries</h3>
          {data.topCountries.map(c => (
            <p key={c.country_code}>
              {c.country_code}: {c.cnt}
            </p>
          ))}
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h3 className="font-semibold mb-2">Top Banks</h3>
          {data.topBanks.map(b => (
            <p key={b.bank}>
              {b.bank}: {b.cnt}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
