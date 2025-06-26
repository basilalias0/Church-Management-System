import React from "react";

const vicars = [
  {
    name: "Joseph Powathil",
    tenure: "2000 - 2005",
    message: "Faith and community bring us closer to God.",
    photo: "/josephpowathil.jpg" // local image from public folder
  },
  {
    name: "Rev. Jose Pulikkal",
    tenure: "2005 - 2010",
    message: "Love and service define our journey.",
    photo: "/father.jpg" // local image from public folder
  },
  {
    name: "Mar Mathew Vattakkuzhy",
    tenure: "2010 - 2015 ",
    message: "Let us walk in His light together.",
    photo: "/father2.webp" // local image from public folder
  },
  {
    name: "Mar Mathew Arackkal",
    tenure: "2015 - 2020 ",
    message: "Let us walk in His light together.",
    photo: "/arackkal.jpg" // local image from public folder
  }
];

const PastVicars = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Past Vicars</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vicars.map((vicar, index) => (
          <div key={index} className="bg-white p-4 rounded-2xl shadow-lg text-center">
            <img
              src={vicar.photo}
              alt={vicar.name}
              className="mx-auto rounded-full w-32 h-32 object-cover mb-4 border-2 border-gray-300"
            />
            <h2 className="text-xl font-semibold text-gray-700">{vicar.name}</h2>
            <p className="text-gray-500 text-sm">{vicar.tenure}</p>
            <p className="mt-2 text-gray-600 italic">"{vicar.message}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastVicars;
