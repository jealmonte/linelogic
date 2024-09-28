// Evaluation.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import line1 from '../assets/line1.mp4';
import line2 from '../assets/line2.mp4';
import line3 from '../assets/line3.mp4';

const Evaluation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to redirect to the results page after 24 seconds
    const timer = setTimeout(() => {
      navigate('/results'); /* replace wit results file */
    }, 24000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="video-container">
      <div className="video-row">
        <video src={line1} autoPlay muted loop className="video" />
        <video src={line2} autoPlay muted loop className="video" />
      </div>
      <div className="video-row">
        <video src={line3} autoPlay muted loop className="video" />
      </div>
    </div>
  );
};

export default Evaluation;