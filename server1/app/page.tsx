'use client'
import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState('');
  const [putData, setPutData] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('https://35.95.134.54/api/data',{
        headers: {
          'Content-Type': 'application/json',
        }});
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result); setError(null);

    } catch (err: any) {
      setError(err.message);
      setData(null);
    }
  };

  const sendPostData = async () => {
    try {
      const response = await fetch('https://35.95.134.54/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: postData }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setPostData(''); setError(null);

    } catch (err: any) {
      setError(err.message);
      setData(null);

    }
  };

  const updateData = async () => {
    try {
      const response = await fetch('https://35.95.134.54/api/data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: putData }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setPutData(''); setError(null);

    } catch (err: any) {
      setError(err.message);
      setData(null);

    }
  };

  const deleteData = async () => {
    try {
      const response = await fetch('https://35.95.134.54/api/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setError(null);

    } catch (err: any) {
      setError(err.message);
      setData(null);

    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Fetch Data from Flask API (port 5000)</h1>

      <button
        onClick={fetchData}
        className="px-4 py-2 text-lg text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition mb-4"
      >
        Fetch Data (GET)
      </button>

      <div className="mb-4">
        <input
          type="text"
          value={postData}
          onChange={(e) => setPostData(e.target.value)}
          className="border rounded px-4 py-2 mr-2"
          placeholder="Enter message for POST"
        />
        <button
          onClick={sendPostData}
          className="px-4 py-2 text-lg text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
        >
          Send Data (POST)
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={putData}
          onChange={(e) => setPutData(e.target.value)}
          className="border rounded px-4 py-2 mr-2"
          placeholder="Enter message for PUT"
        />
        <button
          onClick={updateData}
          className="px-4 py-2 text-lg text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
        >
          Update Data (PUT)
        </button>
      </div>

      <div className="mb-4">

        <button
          onClick={deleteData}
          className="px-4 py-2 text-lg text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
        >
          Delete Data (DELETE)
        </button>
      </div>

      {error && <p className="mt-4 text-2xl text-red-600">{error}</p>}

      {data && (
        <div className="mt-6 p-4 bg-white rounded shadow-md w-full max-w-md">
          <h3 className="text-xl font-semibold">Data from API:</h3>
          <pre className="mt-2 text-gray-800 whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
  