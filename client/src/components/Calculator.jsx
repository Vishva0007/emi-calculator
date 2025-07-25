import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as z from 'zod';
import Results from './Results';
import Chatbot from './Chatbot';

const schema = z.object({
  country: z.string(),
  bank: z.string(),
  amount: z.number().positive(),
  tenure: z.number().positive(),
  interest: z.number().positive()
});

export default function Calculator() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({ resolver: zodResolver(schema) });
  const [countries, setCountries] = useState([]);
  const [banks, setBanks] = useState([]);
  const [result, setResult] = useState(null);

  const country = watch('country');

  useEffect(() => {
    axios.get('/api/countries').then(res => setCountries(res.data));
  }, []);

  useEffect(() => {
    if (country) {
      axios.get('/api/banks', { params: { country } }).then(res => {
        setBanks(res.data);
        if (res.data[0]) setValue('bank', res.data[0].name);
        if (res.data[0]) setValue('interest', res.data[0].interest_min);
      });
    }
  }, [country]);

  const onSubmit = data => {
    axios
      .post('/api/emi', {
        country: data.country,
        bank: data.bank,
        amount: data.amount,
        tenureMonths: data.tenure,
        interest: data.interest
      })
      .then(res => setResult(res.data));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 bg-white dark:bg-gray-800 p-6 rounded shadow"
      >
        {/* Country */}
        <label>
          Country
          <select {...register('country')} className="w-full p-2 rounded">
            <option value="">Select</option>
            {countries.map(c => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        {/* Bank */}
        <label>
          Bank
          <select {...register('bank')} className="w-full p-2 rounded">
            {banks.map(b => (
              <option key={b.id} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
        {/* Amount */}
        <label>
          Loan Amount
          <input
            type="number"
            step="0.01"
            {...register('amount', { valueAsNumber: true })}
            className="w-full p-2 rounded"
          />
          {errors.amount?.message}
        </label>
        {/* Tenure */}
        <label>
          Tenure (months)
          <input
            type="number"
            {...register('tenure', { valueAsNumber: true })}
            className="w-full p-2 rounded"
          />
        </label>
        {/* Interest */}
        <label>
          Interest (% p.a.)
          <input
            type="number"
            step="0.01"
            {...register('interest', { valueAsNumber: true })}
            className="w-full p-2 rounded"
          />
        </label>
        <button className="bg-blue-600 text-white p-2 rounded">Calculate</button>
      </form>
      {result && <Results data={result} />}
      <Chatbot context={{ country, amount: watch('amount'), tenure: watch('tenure'), interest: watch('interest') }} />
    </>
  );
}
