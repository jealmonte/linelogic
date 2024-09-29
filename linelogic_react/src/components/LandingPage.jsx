import React from 'react';
import { useInView } from 'react-intersection-observer';
import '../styles/LandingPage.css';
import logo from '../assets/LL-logo-white.png';
import planeVideo from '../assets/plane-video.webm';

const LandingPage = () => {
    const { ref: section1Ref, inView: section1InView } = useInView({ threshold: 0.5 });
    const { ref: section2Ref, inView: section2InView } = useInView({ threshold: 0.5 });
    const { ref: section3Ref, inView: section3InView } = useInView({ threshold: 0.5 });
    const { ref: section4Ref, inView: section4InView } = useInView({ threshold: 0.5 });

    return (
        <div className="relative w-full h-screen overflow-y-scroll snap-y snap-mandatory">
            {/* Top bar */}
            <div className="fixed top-0 left-0 w-full bg-transparent text-white p-4 z-50 flex items-center">
                <div className="max-w-7xl mx-auto flex items-center w-full justify-start">
                    <nav className="flex w-full">
                        <ul className="flex space-x-8">
                            <li>
                                <img 
                                    src={logo} 
                                    alt="LineLogic Logo" 
                                    className="h-8"
                                />
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleScroll('section1')} 
                                    className="hover:text-gray-400 text-xl font-helvetica"
                                >
                                    Intro
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleScroll('section2')} 
                                    className="hover:text-gray-400 text-xl font-helvetica"
                                >
                                    Services
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleScroll('section3')} 
                                    className="hover:text-gray-400 text-xl font-helvetica"
                                >
                                    About
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleScroll('section4')} 
                                    className="hover:text-gray-400 text-xl font-helvetica"
                                >
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {/* Plane Video - Positioned at the Top */}
            <div className="absolute right-64 top-12 h-screen flex items-start justify-center">
                <video 
                    className="h-1/2 w-auto object-cover"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                >
                    <source src={planeVideo} type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            </div>
        
            {/* Main Content */}
            <div className="pt-16 max-w-7xl mx-auto px-4">
                <div
                    ref={section1Ref}
                    id="section1"
                    className={`h-screen flex flex-col items-start justify-start text-white transition-opacity duration-500 snap-start z-10 ${section1InView ? 'opacity-100' : 'opacity-50'} pt-64`}
                >
                    <h1 className="text-7xl font-helvetica-bold">Welcome to <br />linelogic.</h1>
                    <h2 className="mt-4 text-xl max-w-xl font-helvetica">
                        Your smart pass through TSA—no more guessing, just go. Use our advanced AI to predict security line wait times at airports.
                    </h2>
                    <button className="mt-8 bg-black text-white font-helvetica py-3 px-6 rounded hover:bg-maroon-300">
                        Get Started
                    </button>
                </div>
                <div
                    ref={section2Ref}
                    id="section2"
                    className={`h-screen flex items-center justify-start text-white text-7xl transition-opacity duration-500 snap-start ${section2InView ? 'opacity-100' : 'opacity-50'}`}
                >
                    <span className="font-helvetica-bold">Our Services</span>
                </div>
                <div
                    ref={section3Ref}
                    id="section3"
                    className={`h-screen flex items-center justify-start text-white text-7xl transition-opacity duration-500 snap-start ${section3InView ? 'opacity-100' : 'opacity-50'}`}
                >
                    <span className="font-helvetica-bold">About Us</span>
                </div>
                <div
                    ref={section4Ref}
                    id="section4"
                    className={`h-screen flex items-center justify-start text-white text-7xl transition-opacity duration-500 snap-start ${section4InView ? 'opacity-100' : 'opacity-50'}`}
                >
                    <span className="font-helvetica-bold">Contact</span>
                </div>
            </div>
        </div>
        
        );
        }
        export default LandingPage;