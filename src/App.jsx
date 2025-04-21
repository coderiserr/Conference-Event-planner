import React, { useState } from "react";
import ConferenceEvent from "./ConferenceEvent";
import AboutUs from "./AboutUs";

function App() {
  const [showVenue, setShowVenue] = useState(false);

  const handleGetStarted = () => {
    setShowVenue(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!showVenue ? (
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
                Conference Expense Planner
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
                Plan your next major event with us! Our intuitive platform helps you manage venues, equipment, and meals all in one place.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleGetStarted}
                  className="btn-primary text-lg px-8 py-3"
                >
                  Get Started
                </button>
                <a 
                  href="#features" 
                  className="btn-secondary text-lg px-8 py-3"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="mt-16 sm:mt-24">
              <AboutUs />
            </div>
          </div>
        </section>
      ) : (
        <section className="transition-all duration-500 ease-in-out opacity-100 translate-y-0">
          <ConferenceEvent />
        </section>
      )}
    </div>
  );
}

export default App;
