// PlaneComponent.jsx
import React from 'react';
import planeVideo from '../assets/plane-video.webm';
import cloudImage from '../assets/light-cloud.png'; // Adjust the path as necessary

const PlaneComponent = () => {
  return (
    <div className="absolute right-64 top-12 h-screen flex items-start justify-center">
      <video 
        className="h-1/2 w-auto object-cover z-10"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src={planeVideo} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Cloud Image */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          className="cloud"
          src={cloudImage}
          alt="Transparent cloud"
          style={{ transform: 'translate3d(0, 0, 0)' }}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default PlaneComponent;
