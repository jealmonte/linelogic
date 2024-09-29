import React, {useState, useEffect} from 'react';
import { useInView } from 'react-intersection-observer';
import { useAuthInfo, useRedirectFunctions } from "@propelauth/react";
import '../styles/LandingPage.css';
import logo from '../assets/LL-logo-white.png';
import planeVideo from '../assets/plane-video.webm';
import planeImage from '../assets/plane.png';
import cloudImage from '../assets/light-cloud.png'; // Adjust the path as necessary


const LandingPage = () => {
    const { ref: section1Ref, inView: section1InView } = useInView({ threshold: 0.5 });
    const { ref: section2Ref, inView: section2InView } = useInView({ threshold: 0.5 });
    const { ref: section3Ref, inView: section3InView } = useInView({ threshold: 0.5 });
    const { ref: section4Ref, inView: section4InView } = useInView({ threshold: 0.5 });

    const handleScroll = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const auth = useAuthInfo();
    const { redirectToLoginPage } = useRedirectFunctions();

    const handleGetStarted = () => {
        redirectToLoginPage();
    };

    const [showServices, setShowServices] = useState(false);
    const [visibleServices, setVisibleServices] = useState([]);

    useEffect(() => {
        if (section2InView) {
          const timer = setTimeout(() => {
            setVisibleServices((prevVisibleServices) => [
              ...prevVisibleServices,
              ...services.slice(prevVisibleServices.length, prevVisibleServices.length + 1),
            ]);
          }, 300);
      
          return () => clearTimeout(timer);
        }
      }, [section2InView, visibleServices]);

    // Bullet points for the services
    const services = [
        "AI-driven security wait time predictions",
        "Real-time analysis on footage for live TSA wait times",
        "Historical data for trend analysis",
        "User-friendly interface and experience",
        "Deep learning machine algorithm resulting in over 95% accuracy"
    ];

    return (
        <div className="relative w-full h-screen overflow-y-scroll snap-y snap-mandatory">
            {/* Cloud Animation */}
            
            
            {/* Top bar */}
            <div className="fixed top-0 left-0 w-full bg-transparent text-white p-4 z-50 flex items-center">
                <div className="max-w-7xl mx-auto flex items-center w-full justify-start">
                    <nav className="flex w-full items-center">
                        <ul className="flex space-x-8 items-center">
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
                                    className="bg-transparent hover:text-gray-400 text-xl font-helvetica mt-2 text-white"
                                >
                                    Intro
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleScroll('section2')} 
                                    className="bg-transparent hover:text-gray-400 text-xl font-helvetica mt-2 text-white"
                                >
                                    Services
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleScroll('section3')} 
                                    className="bg-transparent hover:text-gray-400 text-xl font-helvetica mt-2 text-white"
                                >
                                    About
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleScroll('section4')} 
                                    className="bg-transparent hover:text-gray-400 text-xl font-helvetica mt-2 text-white"
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
                    <div className="flex mt-8 space-x-6">
                        <button className="bg-black text-white font-helvetica py-3 px-6 rounded hover:bg-maroon-300"
                        onClick={handleGetStarted}
                        >
                        Get Started
                        </button>
                        <button 
                        className="bg-black text-white font-helvetica py-3 px-6 rounded hover:bg-maroon-300"
                        onClick={() => handleScroll('section2')}
                        >
                        Learn More
                        </button>
                    </div>
                    </div>
                    <div
                        ref={section2Ref}
                        id="section2"
                        className={`h-screen flex flex-col justify-center text-white transition-opacity duration-500 snap-start ${
                            section2InView ? 'opacity-100' : 'opacity-50'
                        }`}
                        >
                        <h2 className="font-helvetica-bold" style={{ fontSize: '48pt' }}>Our Services</h2>
                        <ul className="mt-12 space-y-8 font-helvetica" style={{ fontSize: '32pt' }}>
                            {services.map((service, index) => (
                            <li
                                key={index}
                                className={`service-item ${
                                visibleServices.includes(service) ? 'visible' : ''
                                }`}
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                {service}
                            </li>
                            ))}
                        </ul>
                        <div className="flex mt-8 space-x-6">
                            <button
                            className="bg-black text-white font-helvetica py-3 px-6 rounded hover:bg-maroon-300"
                            onClick={() => handleScroll('section3')}
                            >
                            About Us
                            </button>
                            <button
                            className="bg-black text-white font-helvetica py-3 px-6 rounded hover:bg-maroon-300"
                            onClick={() => handleScroll('section4')}
                            >
                            Contact Us
                            </button>
                        </div>
                        </div>

                        <div
                            ref={section3Ref}
                            id="section3"
                            className={`relative h-screen flex flex-col justify-center text-white transition-opacity duration-500 snap-start ${section3InView ? 'opacity-100' : 'opacity-50'}`}
                        >
                            {/* Section Text */}
                            <h2 className="relative z-20 font-helvetica-bold" style={{ fontSize: '64pt', lineHeight: '1.2' }}>
                                Discover the ultimate convenience of live <br /> line-time estimations.
                            </h2>
                            <p className="relative z-20 max-w-4xl font-helvetica mt-10" style={{ fontSize: '20pt', lineHeight: '1.4' }}>
                                linelogic uses cutting-edge AI technology to analyze and predict TSA security line wait times, helping travelers plan their airport arrivals more efficiently. Due to current security constraints, sample analysis footage is drone footage from VTHax 12.
                            </p>

                            {/* Plane Image */}
                            <div className="absolute left-1/2 bottom-0 z-10">
                                <img
                                    src={planeImage}
                                    alt="Plane"
                                    className="object-contain max-h-96"
                                />
                                {/* Cloud Image */}
                                <div className="absolute top-0 left-0 w-full h-full">
                                <img
                                    className="cloud-bottom"
                                    src={cloudImage}
                                    alt="Transparent cloud"
                                    style={{ transform: 'translate3d(0, 0, 0)' }}
                                    loading="lazy"
                                />
                                </div>
                            </div>

                            <div className="flex mt-8 space-x-6 relative z-20">
                                <button className="bg-black text-white font-helvetica py-3 px-6 rounded hover:bg-maroon-300"
                                onClick={() => handleScroll('section1')}
                                >
                                    Ready To Ascend?
                                </button>
                                <button className="bg-black text-white font-helvetica py-3 px-6 rounded hover:bg-maroon-300"
                                onClick={() => handleScroll('section4')}>
                                    Contact Us
                                </button>
                            </div>
                        </div>
                <div
                    ref={section4Ref}
                    id="section4"
                    className={`h-screen flex flex-col justify-center transition-opacity duration-500 snap-start ${
                        section4InView ? 'opacity-100' : 'opacity-50'
                    }`}
                >
                    <div className="w-full max-w-7xl">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/2">
                                <h2 className="font-helvetica-bold" style={{ fontSize: '64pt' }}>
                                    Contact Us
                                </h2>
                                <p className="font-helvetica mt-2" style={{ fontSize: '24pt' }}>
                                    Reach out to us with any questions or inquiries. We're here to help!
                                </p>
                                <div className="mt-8">
                                    <div className="mt-0">
                                        <a 
                                            href="https://www.linkedin.com/in/jealmonte"
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="font-helvetica text-white block transition-transform duration-300 transform hover:translate-x-2"
                                            style={{ fontSize: '20pt' }}
                                        >
                                            Joshua's LinkedIn
                                        </a>
                                    </div>
                                    <div className="mt-4">
                                        <a 
                                            href="https://www.linkedin.com/in/thecoolguy17"
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="font-helvetica text-white block transition-transform duration-300 transform hover:translate-x-2"
                                            style={{ fontSize: '20pt' }}
                                        >
                                            Jeremy's LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <form>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block font-helvetica mb-2" style={{ fontSize: '20pt' }}>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-2 bg-gray-200 text-black rounded"
                                            style={{ fontSize: '16pt' }}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="phone" className="block font-helvetica mb-2" style={{ fontSize: '20pt' }}>
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="w-full px-4 py-2 bg-gray-200 text-black rounded"
                                            style={{ fontSize: '16pt' }}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="message" className="block font-helvetica mb-2" style={{ fontSize: '20pt' }}>
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            className="w-full px-4 py-2 bg-gray-200 text-black rounded"
                                            style={{ fontSize: '16pt' }}
                                            rows="4"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-black text-white font-helvetica py-3 px-6 rounded hover:bg-maroon-300"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
        
        );
        }
        export default LandingPage;