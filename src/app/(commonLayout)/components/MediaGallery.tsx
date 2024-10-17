"use client";
import React from "react";
import Image from "next/image";
import LightGallery from "lightgallery/react";
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

// Function to render media dynamically based on type (image/video)
const renderMedia = (media: string[]) => {
  return media?.map((item, index) => {
    return (
      <a
        key={index}
        href={item}
        data-lg-size="1600-950"
        data-sub-html={`<h4>Image ${index + 1}</h4>`} // Optional: Add a caption
      >
        <Image
          width={300}
          height={300}
          src={item}
          alt={`Image ${index + 1}`}
          className="w-full h-56 object-cover rounded-md my-2"
        />
      </a>
    );
  });
};
const MediaGallery = ({ media }: { media: string[] }) => {
  return (
    <div className="MediaGallery">
      <LightGallery
        elementClassNames={`mt-2 gap-2 grid place-items-center ${
          media?.length === 1 ? "grid-cols-1" : "grid-cols-3"
        }`}
        plugins={[lgThumbnail, lgZoom]}
        speed={500}
      >
        {renderMedia(media)}
      </LightGallery>
    </div>
  );
};

export default MediaGallery;
