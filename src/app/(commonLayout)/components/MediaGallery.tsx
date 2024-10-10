
"use client"; 
import React from 'react';
import Image from 'next/image';
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

// Function to render media dynamically based on type (image/video)
const renderMedia = (media:string[]) => {
  return media?.map((item, index) => {
    const isImage = item.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i) !== null;
    const isVideo = item.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be|vimeo\.com)/i) || item.match(/\.(mp4|webm|ogg|avi|mov|mkv)$/i);

    if (isImage) {
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
    }

    if (isVideo) {
      let videoId;
      if (item.includes("youtu.be")) {
        // Extract video ID from the short URL
        videoId = item.split('/').pop(); // Get the last part of the URL
      } else {
        // Extract video ID from the standard URL
        videoId = item.split('v=')[1]?.split('&')[0]; // Extract video ID from full URL
      }

      return (
        <div key={index} className="my-2">
          <iframe
            width="300"
            height="200"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`YouTube Video ${index + 1}`}
            frameBorder="0"
            allowFullScreen
            className="w-full h-56 object-cover rounded-md"
          />
        </div>
      );
    }

    return null; 
  });
};

const MediaGallery = ({ media }:{media:string[]}) => {

  return (
    <div className="MediaGallery">
      <LightGallery 
        elementClassNames={`mt-2 gap-2 grid place-items-center ${media?.length === 1 ? "grid-cols-1" : "grid-cols-3"}`}
        plugins={[lgThumbnail, lgZoom]}
        speed={500}
      >
        {renderMedia(media)}
      </LightGallery>
    </div>
  );
};

export default MediaGallery;
