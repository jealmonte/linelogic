// Results.jsx
import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import mapImage from '../assets/map_image.png';

function Results() {
  const userName = 'almontejoshua2';
  const estimatedTime = '1 hour, 34 minutes';
  const liveUpdates = {
    'Check-in': '40 minutes',
    'Baggage': '5 minutes',
    'Security Check': '24 minutes',
    'Immigration': '13 minutes',
    'To Gate': '12 minutes',
  };

  const [randomValues, setRandomValues] = useState([]);

  useEffect(() => {
    const generateRandomValues = () => {
      const ranges = [
        { time: [110, 130], people: [13, 18] },
        { time: [280, 330], people: [14, 18] },
        { time: [210, 260], people: [13, 17] },
      ];

      const results = ranges.map(range => ({
        time: (Math.random() * (range.time[1] - range.time[0]) + range.time[0]).toFixed(2),
        people: (Math.random() * (range.people[1] - range.people[0]) + range.people[0]).toFixed(2)
      }));

      setRandomValues(results);
    };

    generateRandomValues();
  }, []);

  return (
    <>
      <TopBar />
      <Sidebar onPlusButtonClick={() => {}} /> {/* No action needed for the plus button here */}
      <div className="main-content">
        <h1>
          <div className="greeting font-bold">
            Hi&nbsp;
            {userName.split('').map((letter, index) => (
              <span key={index} className="username-letter">
                {letter}
              </span>
            ))}
            ,
          </div>
        </h1>
        <p>
          The estimated time to get to your gate from your location is: <strong>{estimatedTime}</strong> →
        </p>
        <img src={mapImage} alt="Map" />
        <div className="live-updates">
          <span style={{ color: 'green' }}>● Live</span>
          <ul>
            {Object.entries(liveUpdates).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
        {randomValues.map((value, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={`Estimated time: ${value.time} secs`}
              readOnly
              style={{ backgroundColor: 'transparent', border: 'none', fontFamily: 'inherit', fontSize: 'inherit' }}
            />
            <input
              type="text"
              value={`People in frame: ${value.people}`}
              readOnly
              style={{ backgroundColor: 'transparent', border: 'none', fontFamily: 'inherit', fontSize: 'inherit' }}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Results;