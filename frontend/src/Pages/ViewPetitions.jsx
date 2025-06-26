import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAllPetitionsAPI } from '../Services/PetitionService';

const ViewPetitions = () => {
    const {data:petitions,isLoading,isError,error}=useQuery({
        queryFn:getAllPetitionsAPI,
        queryKey:['view-petition']
    })

    console.log(petitions);
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat p-4" style={{ backgroundImage: "url('public/petition2.jpg')" }}>
            <div className="max-w-lg w-full bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl border border-yellow-500">
                <h2 className="text-3xl font-extrabold text-center text-yellow-500 mb-6">View Petitions</h2>
                <ul className="space-y-4">
                    {petitions?.map((petition) => (
                        <li key={petition.id} className="border-b pb-2">
                            <p><strong>Name:</strong> {petition.userId.name}</p>
                            <p><strong>Email:</strong> {petition.userId.email}</p>
                            <p><strong>Petition:</strong> {petition.title}</p>
                            <p><strong>Description:</strong> {petition.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ViewPetitions;
