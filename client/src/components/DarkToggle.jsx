import { useApp } from '../context/AppContext';
export default function DarkToggle() {
  const { dark, setDark } = useApp();
  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
}
