import React from 'react';
import { useInView } from 'react-intersection-observer';
import '../styles/LandingPage.css';

const LandingPage = () => {
    const { ref: section1Ref, inView: section1InView } = useInView({ threshold: 0.5 });
    const { ref: section2Ref, inView: section2InView } = useInView({ threshold: 0.5 });
    const { ref: section3Ref, inView: section3InView } = useInView({ threshold: 0.5 });
    const { ref: section4Ref, inView: section4InView } = useInView({ threshold: 0.5 });

    return (
        <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory">
            <div
                ref={section1Ref}
                className={`h-screen flex items-center justify-center text-white text-4xl transition-opacity duration-500 snap-start ${section1InView ? 'opacity-100' : 'opacity-50'}`}
            >
                Welcome to LineLogic
            </div>
            <div
                ref={section2Ref}
                className={`h-screen flex items-center justify-center text-white text-4xl transition-opacity duration-500 snap-start ${section2InView ? 'opacity-100' : 'opacity-50'}`}
            >
                Our Services
            </div>
            <div
                ref={section3Ref}
                className={`h-screen flex items-center justify-center text-white text-4xl transition-opacity duration-500 snap-start ${section3InView ? 'opacity-100' : 'opacity-50'}`}
            >
                About Us
            </div>
            <div
                ref={section4Ref}
                className={`h-screen flex items-center justify-center text-white text-4xl transition-opacity duration-500 snap-start ${section4InView ? 'opacity-100' : 'opacity-50'}`}
            >
                Contact
            </div>
        </div>
    );
};

export default LandingPage;
