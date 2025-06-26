import React from "react";
import { Link, useParams } from "react-router-dom";

const membersData = [
  { id: 1, name: "John Doe", role: "Vicar", contact: "john@example.com", phone: "123-456-7890", family: [] },
  { id: 2, name: "Sarah Smith", role: "Choir Leader", contact: "sarah@example.com", phone: "987-654-3211", family: [
      { name: "Samuel Smith", phone: "111-222-3333", relation: "Husband" },
      { name: "Sophia Smith", phone: "444-555-6666", relation: "Daughter" }
    ]
  },
  { id: 3, name: "David Johnson", role: "Assistant Vicar", contact: "david@example.com", phone: "321-654-0987", family: [], vicar: "John Doe" }
];

const MemberDetails = () => {
  const { id } = useParams();
  const member = membersData.find((m) => m.id === parseInt(id));
  
  if (!member) return <p className="text-center mt-10 text-red-600">Member not found!</p>;

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto max-w-2xl bg-white shadow-2xl rounded-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6 uppercase tracking-wide">
          {member.name}'s Details
        </h1>
        <div className="text-center mb-6">
          <p className="text-lg text-gray-700 font-medium">Phone: <span className="text-gray-900 font-semibold">{member.phone}</span></p>
          <p className="text-lg text-gray-700 font-medium">Email: <span className="text-gray-900 font-semibold">{member.contact}</span></p>
          {member.vicar && <p className="text-lg text-gray-700 font-medium">Vicar: <span className="text-gray-900 font-semibold">{member.vicar}</span></p>}
        </div>
        {member.family.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-md text-center">
              <thead>
                <tr className="bg-gray-300">
                  <th className="border border-gray-400 px-4 py-3 text-gray-800">Name</th>
                  <th className="border border-gray-400 px-4 py-3 text-gray-800">Phone</th>
                  <th className="border border-gray-400 px-4 py-3 text-gray-800">Relation</th>
                </tr>
              </thead>
              <tbody>
                {member.family.map((relative, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">{relative.name}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">{relative.phone}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">{relative.relation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600 italic">No family details available.</p>
        )}
        <div className="text-center mt-8">
          <Link to="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all font-semibold uppercase">Back to Directory</Link>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
