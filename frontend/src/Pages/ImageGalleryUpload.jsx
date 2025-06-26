import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import galleryService from "../Services/GalleryService";

const ImageGalleryUpload = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const mutation = useMutation({
    mutationFn: ({ file, description }) => galleryService.createGalleryItem(file, description),
    onSuccess: () => {
      setFile(null);
      setDescription("");
      document.getElementById("file-input").value = "";
      alert("File uploaded successfully!");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Upload failed. Try again.");
    },
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    mutation.mutate({ file, description });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Upload to Gallery</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Select File:</label>
          <input
            id="file-input"
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description (optional):</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Add a description..."
          />
        </div>
        {mutation.isError && (
          <p className="text-red-600 text-center">
            {mutation.error.response?.data?.message || "Upload failed"}
          </p>
        )}
        {mutation.isSuccess && (
          <p className="text-green-600 text-center">File uploaded successfully!</p>
        )}
        <button
          type="submit"
          disabled={mutation.isPending}
          className={`w-full py-2 rounded text-white ${
            mutation.isPending ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {mutation.isPending ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default ImageGalleryUpload;