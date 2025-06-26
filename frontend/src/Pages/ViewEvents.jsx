import React, { useEffect, useState } from "react";
import { eventService } from "../Services/eventService";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (err) {
      console.error("Fetch Events Error:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Church Events</h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events available.</p>
      ) : (
        <ul className="space-y-6">
          {events.map((event) => (
            <li
              key={event._id}
              className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-lg transition-all"
            >
              <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>
              <p className="text-gray-600 mt-2">{event.description}</p>
              <p className="text-sm text-blue-600 mt-3">
                📅 {new Date(event.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewEvents;
