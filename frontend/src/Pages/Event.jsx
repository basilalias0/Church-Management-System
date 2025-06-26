import React, { useEffect, useState } from 'react';
import { eventService } from '../Services/eventService';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', date: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getAllEvents();
      setEvents(data.reverse());
    } catch (err) {
      console.error('Fetch Events Error:', err);
      alert('❌ Failed to fetch events');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await eventService.updateEvent(editingId, formData);
        alert('✅ Event updated successfully!');
      } else {
        await eventService.createEvent(formData);
        alert('✅ Event created successfully!');
      }
      setFormData({ title: '', description: '', date: '' });
      setEditingId(null);
      fetchEvents();
    } catch (err) {
      console.error('Event Submit Error:', err);
      alert('❌ Failed to submit event');
    }
  };

  const handleEdit = (event) => {
    setFormData({ title: event.title, description: event.description, date: event.date.split('T')[0] });
    setEditingId(event._id);
  };

  const handleDelete = async (id) => {
    try {
      await eventService.deleteEvent(id);
      alert('❌ Event deleted');
      fetchEvents();
    } catch (err) {
      console.error('Delete Event Error:', err);
      alert('❌ Failed to delete event');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/church6.jpeg')" }}
    >
      <div className="bg-white bg-opacity-90 max-w-4xl mx-auto p-6 rounded-xl shadow-md">
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{editingId ? 'Edit Event' : 'Create Event'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="border border-gray-300 rounded-lg p-3 w-full h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
            >
              {editingId ? 'Update' : 'Create'} Event
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Events</h2>
          <ul className="space-y-4">
            {events.map((event) => (
              <li
                key={event._id}
                className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm flex justify-between items-start"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                  <p className="text-gray-600 mt-1">{event.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    📅 {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Event;
