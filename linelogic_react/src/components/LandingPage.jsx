import React, { Suspense } from 'react';
import { useAuthInfo, useRedirectFunctions } from "@propelauth/react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stage, PresentationControls } from '@react-three/drei';
import Model from '../../public/Plane.jsx';
import { ErrorBoundary } from 'react-error-boundary';

function LandingPage() {
  const auth = useAuthInfo();
  const { redirectToLoginPage } = useRedirectFunctions();

  const handleGetStarted = () => {
    redirectToLoginPage();
  };

  function ErrorFallback({ error }) {
    return (
      <div>
        <h2>Something went wrong:</h2>
        <pre>{error.message}</pre>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 text-white">
      <div className="flex items-left justify-between">
        <header className="w-1/2 text-left py-8 bg-black-800">
          <h1 className="text-6xl font-bold">waitless</h1>
          <p className="mt-2 text-white-400">Move like you're weightless.</p>
          <p className="mt-1 text-white-400">Use our advanced AI to predict security line wait times at airports.</p>
          <button 
            className="mt-6 bg-red-500 hover:bg-red-600 text-black font-semibold py-2 px-4 rounded"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </header>

        <div className="w-1/2">
          <Canvas dpr={[1, 2]} camera={{ fov: 45 }}>
            <color attach="background" args={["#4A1128"]} />
            <PresentationControls speed={1.5} global zoom={0.1} polar={[-0.1, Math.PI / 4]}>
              <Stage environment={"sunset"}>
                <Model scale={0.02} />
              </Stage>
            </PresentationControls>
          </Canvas>
        </div>
      </div>

      <main>
        <section className="info-section">
          <div className="info-box">
          <h1 className="info-title">About</h1>
          <p>Waitless uses cutting-edge
              AI technology to analyze
              and predict TSA security
              line wait times, helping
              travelers plan their 
              airport arrival more
              efficiently. Due to current security
              constraints, sample analysis comes 
              from drone footage during VTHacks 12,
              Virginia Tech's annual hackathon.</p>
          </div>
          <div className="info-box">
          <h1 className="info-title">Features</h1>
            <p>
              - Real-time wait estimates
              <br></br>
              - Airport-specific predictions
              <br></br>
              - Historical data analysis
              <br></br>
              - User-friendly interface
              <br></br>
              - Deep learning machine algorithim
            </p>
          </div>
          <div className="info-box">
          <h1 className="info-title">Contact</h1>
            <p>Get in touch
              with our team
              for any inquiries
              or support!
            </p>
            <br></br>
            <p>
        <a href="https://www.linkedin.com/in/jealmonte/" target="_blank" rel="noopener noreferrer" className="link">
          Joshua Almonte
        </a>
      </p>
      <p>
        <a href="https://www.linkedin.com/in/kfenaish/" target="_blank" rel="noopener noreferrer" className="link">
          Kareem Fenaish
        </a>
      </p>
      <p>
        <a href="https://www.linkedin.com/in/thecoolguy17/" target="_blank" rel="noopener noreferrer" className="link">
          Jeremy Kruse
        </a>
      </p>
      <p>
        <a href="https://www.linkedin.com/in/frankhyun/" target="_blank" rel="noopener noreferrer" className="link">
          Frank Hyun
        </a>
      </p>
    </div>
  </section>
      </main>
      <footer className="hawktuah">
      <p>© 2024 waitless, Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;