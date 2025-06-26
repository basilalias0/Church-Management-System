import React from "react";
import { useQuery } from "@tanstack/react-query";
import galleryService from "../Services/GalleryService";

const Gallery = () => {
  const {
    data: galleryItems = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["galleryItems"],
    queryFn: galleryService.getAllGalleryItems,
  });

  const renderMedia = (item) => {
    if (!item.url) {
      return <p className="text-red-500 text-center">Invalid item data</p>;
    }

    return item.type === "Image" ? (
      <img
        src={item.url}
        alt={item.description || "Gallery Item"}
        className="w-full h-full object-cover"
      />
    ) : (
      <video
        src={item.url}
        controls
        className="w-full h-full object-cover"
      />
    );
  };

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-600 text-center">
        {error.message || "Failed to load gallery items."}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-900 text-center py-6">
        Gallery
      </h2>
      {galleryItems.length === 0 ? (
        <p className="text-center text-gray-600">No gallery items available.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {galleryItems.map((item) => (
            <div
              key={item._id || Math.random()}
              className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] overflow-hidden bg-white"
            >
              {renderMedia(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;