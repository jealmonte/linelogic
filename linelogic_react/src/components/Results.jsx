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

      const results = ranges.map((range) => ({
        time: (Math.random() * (range.time[1] - range.time[0]) + range.time[0]).toFixed(2),
        people: (Math.random() * (range.people[1] - range.people[0]) + range.people[0]).toFixed(2),
      }));

      setRandomValues(results);
    };

    generateRandomValues();
  }, []);

  const videoLabels = ['Baggage', 'Security', 'Immigration']; // New labels

  return (
    <div className="flex h-screen w-full">
      <Sidebar onPlusButtonClick={() => {}} />
      <div className="flex-1 relative p-6 space-y-6 overflow-y-auto ml-[80px] mt-[120px] w-full"> {/* Increased margin-top */}
        <TopBar />
        <div className="flex w-full"> {/* Ensures content stretches the entire width */}
          <div className="w-1/2">
            <img
              src={mapImage}
              alt="Map"
              className="rounded-lg w-full h-auto border border-gray-300 mb-6 transition-transform transform hover:scale-105 hover:shadow-lg mt-10" // Added hover effects
              style={{ filter: 'blur(0.5px)' }}
            />
          </div>
          <div className="w-1/2 p-4 space-y-14 mt-6">
            <div className="bg-gray-800 text-white rounded-lg p-4 shadow-lg w-full transition-transform transform hover:scale-105 hover:shadow-lg"> {/* Added hover effects */}
              <h1 className="text-xl font-bold">
                Hi&nbsp;
                {userName.split('').map((letter, index) => (
                  <span key={index} className="inline-block">{letter}</span>
                ))}
                ,
              </h1>
              <p>
                The estimated time to get to your gate from your location is: <strong>{estimatedTime}</strong> →
              </p>
            </div>

            <div className="bg-gray-800 text-white rounded-lg p-4 shadow-lg w-full transition-transform transform hover:scale-105 hover:shadow-lg"> {/* Added hover effects */}
              <span className="text-green-400">● Live Updates</span>
              <ul className="list-disc pl-5">
                {Object.entries(liveUpdates).map(([key, value]) => (
                  <li key={key} className="py-1">
                    <div className="bg-gray-700 rounded-lg p-2 w-full transition-transform transform hover:scale-105 hover:shadow-lg"> {/* Added hover effects */}
                      {key}: {value}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4 w-full mt-[30px]"> {/* Moved down 30px */}
          {randomValues.map((value, index) => (
            <div key={index} className="bg-gray-800 text-white rounded-lg p-4 shadow-lg w-full transition-transform transform hover:scale-105 hover:shadow-lg"> {/* Added hover effects */}
              <h2 className="font-bold">Video: {videoLabels[index]}</h2> {/* Replaced index with label */}
              <input
                type="text"
                value={`Estimated time: ${value.time} secs`}
                readOnly
                className="bg-transparent border-none w-full text-base font-inherit"
              />
              <input
                type="text"
                value={`People in frame: ${value.people}`}
                readOnly
                className="bg-transparent border-none w-full text-base font-inherit"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results;
