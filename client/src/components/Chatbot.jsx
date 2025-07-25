import { useState } from 'react';
import axios from 'axios';
export default function Chatbot({ context }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const send = () => {
    axios
      .post('/api/chat', { ...context, message: input })
      .then(res =>
        setMessages([...messages, { role: 'user', text: input }, { role: 'bot', text: res.data.reply }])
      );
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg"
      >
        💬
      </button>
      {open && (
        <div className="fixed bottom-20 right-4 w-72 bg-white dark:bg-gray-800 p-4 rounded shadow-lg">
          <div className="h-48 overflow-y-auto mb-2">
            {messages.map((m, i) => (
              <div key={i} className={`text-sm ${m.role === 'user' ? 'text-right' : ''}`}>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 p-1 rounded">{m.text}</span>
              </div>
            ))}
          </div>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            className="w-full p-1 rounded border"
            placeholder="Ask something…"
          />
        </div>
      )}
    </>
  );
}
