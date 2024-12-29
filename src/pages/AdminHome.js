import React, { useState } from 'react';

export const AdminHome = () => {
  const [form, setForm] = useState({
    type: 'election', // Default form type
    fields: {
      title: '',
      description: '',
      beginning_date: '',
      ending_date: '',
      name: '',
      party_id: '',
      election_id: '',
    },
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      fields: { ...form.fields, [e.target.name]: e.target.value },
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    let endpoint = '';
    const { type, fields } = form;

    // Select endpoint
    if (type === 'election') endpoint = '/election';
    else if (type === 'party') endpoint = '/party';
    else if (type === 'candidate') endpoint = '/candidate';

    try {
      const response = await fetch(
        `http://localhost:5000/admin/create${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.REACT_APP_VOTING_API_BACKEND_KEY
          },
          credentials: 'include', // Send cookies/session data
          body: JSON.stringify(fields),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred');
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Page</h1>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Select Action</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="block w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="election">Create Election</option>
            <option value="party">Create Party</option>
            <option value="candidate">Create Candidate</option>
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          {form.type === 'election' && (
            <>
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={form.fields.title}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg p-2 mb-4"
              />
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={form.fields.description}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg p-2 mb-4"
              />
              <label className="block text-gray-700 font-medium mb-2">Beginning Date</label>
              <input
                type="date"
                name="beginning_date"
                value={form.fields.beginning_date}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg p-2 mb-4"
              />
              <label className="block text-gray-700 font-medium mb-2">Ending Date</label>
              <input
                type="date"
                name="ending_date"
                value={form.fields.ending_date}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg p-2 mb-4"
              />
            </>
          )}

          {form.type === 'party' && (
            <>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={form.fields.name}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg p-2 mb-4"
              />
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={form.fields.description}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg p-2 mb-4"
              />
            </>
          )}

          {form.type === 'candidate' && (
            <>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={form.fields.name}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg p-2 mb-4"
              />
              <label className="block text-gray-700 font-medium mb-2">Party ID</label>
              <input
                type="text"
                name="party_id"
                value={form.fields.party_id}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg p-2 mb-4"
              />
              <label className="block text-gray-700 font-medium mb-2">Election ID</label>
              <input
                type="text"
                name="election_id"
                value={form.fields.election_id}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg p-2 mb-4"
              />
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={form.fields.description}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg p-2 mb-4"
              />
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
          >
            Submit
          </button>
        </form>

        {/* Feedback Messages */}
        {message && <div className="text-green-600 mt-4">{message}</div>}
        {error && <div className="text-red-600 mt-4">{error}</div>}
      </div>
    </div>
  );
};

