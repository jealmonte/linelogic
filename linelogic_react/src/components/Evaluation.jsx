import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import line1 from '../assets/line1.mp4';
import line2 from '../assets/line2.mp4';
import line3 from '../assets/line3.mp4';
import { Line } from 'react-chartjs-2'; 
import Sidebar from './Sidebar.jsx';
import TopBar from './TopBar.jsx';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale, 
  Title,
  Tooltip,
  Legend,
} from 'chart.js'; 

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale, 
  Title,
  Tooltip,
  Legend
);

const Evaluation = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get location to fetch passed data
  const { airportName, currentLocation, user } = location.state; // Destructure to get data

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Elapsed Time (s) Averages Across Videos',
        data: [],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  });

  const [lastThreeValues, setLastThreeValues] = useState([]);
  const [showResultsButton, setShowResultsButton] = useState(false);
  const [loading, setLoading] = useState(true); // New state for loading
  const [simulationComplete, setSimulationComplete] = useState(false); // New state for simulation completion

  useEffect(() => {
    // Show loading state for 5 seconds
    const loadingTimer = setTimeout(() => {
      setLoading(false); // Stop loading after 5 seconds
    }, 5000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (!loading) { // Only start chart updates after loading
      let elapsedTime = 0;
      const interval = setInterval(() => {
        elapsedTime += Math.random() * (20 - 10) + 10;
        
        setChartData(prev => {
          const newData = [...prev.datasets[0].data, elapsedTime];

          // Keep only the last three values
          const newLastThree = newData.slice(-3);

          setLastThreeValues(newLastThree);

          return {
            ...prev,
            labels: [...prev.labels, ''],
            datasets: [
              {
                ...prev.datasets[0],
                data: newData,
              },
            ],
          };
        });
      }, 1000); 

      setTimeout(() => {
        clearInterval(interval);
        setSimulationComplete(true); // Mark simulation as complete after 20 seconds
      }, 20000);

      return () => clearInterval(interval);
    }
  }, [loading]);

  const calculatedValues = lastThreeValues.map(value => (value * (Math.random() * 2 + 5)).toFixed(2));

  return (
    <div className="evaluation-container flex flex-col w-full h-screen">
      {/* TopBar and Sidebar Wrapper */}
      <div className="flex flex-1">
        <Sidebar />
        <div className="main-content flex-1 flex flex-col">
          <TopBar />
          <div className="content-area flex flex-col flex-grow p-4">
            <div className="flex flex-row w-full mb-4 h-screen">
              <div className="video-container flex flex-col -mt-32 ml-20 w-1/4">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-4 mr-8 border-blue-500">
                      {/* Loading Spinner */}
                    </div>
                    <div>Loading deep learning algorithm...</div>
                  </div>
                ) : (
                  <>
                    <video src={line1} autoPlay muted loop className="video" />
                    <video src={line2} autoPlay muted loop className="video" />
                    <video src={line3} autoPlay muted loop className="video" />
                  </>
                )}
              </div>
              <div className="flex flex-col w-1/2 ml-48 -mt-10">
                <div className="chart-container flex-grow mb-2">
                  <Line data={chartData} options={{ responsive: true, maintainAspectRatio: true }} />
                </div>
                <div className="text-box bg-[#0F0D13] border p-6 flex flex-col justify-between mb-64 h-80 ml-4">
                  <h2 className="text-lg font-bold">Projected Wait Time in Security Line (ΔT × Empirical Ratio):</h2>
                  <div className="elapsed-times">
                    {calculatedValues.map((value, index) => (
                      <div key={index}>{index + 1}. {value} seconds</div>
                    ))}
                  </div>
                  {simulationComplete && ( // Show button only when simulation is complete
                    <button 
                      className="mt-4 bg-purple text-white py-2 px-4 rounded"
                      onClick={() => navigate('/results', {
                        state: {
                          airportName,
                          currentLocation,
                          user,
                        },
                      })}
                    >
                      Calculations complete, see estimations
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
