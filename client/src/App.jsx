import { Routes, Route, Link } from 'react-router-dom';
import Calculator from './components/Calculator';
import Admin from './pages/Admin';
import DarkToggle from './components/DarkToggle';
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <header className="flex items-center justify-between p-4 shadow">
        <h1 className="text-xl font-bold">
          <Link to="/">EMI Calculator</Link>
        </h1>
        <div className="flex items-center gap-4">
          <DarkToggle />
          <Link to="/admin" className="underline">
            Admin
          </Link>
        </div>
      </header>
      <main className="p-4 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
}
