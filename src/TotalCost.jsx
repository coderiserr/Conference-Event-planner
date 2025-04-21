import React from 'react';

const TotalCost = ({ totalCosts, handleClick, ItemsDisplay }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-soft p-4 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-2">Total Cost</h2>
          <div className="text-3xl sm:text-4xl font-bold text-primary">
            ${totalCosts.venue + totalCosts.av + totalCosts.meals}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">Venue</p>
            <p className="text-lg sm:text-xl font-semibold text-primary">${totalCosts.venue}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">Add-ons</p>
            <p className="text-lg sm:text-xl font-semibold text-primary">${totalCosts.av}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">Meals</p>
            <p className="text-lg sm:text-xl font-semibold text-primary">${totalCosts.meals}</p>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <ItemsDisplay />
        </div>

        <div className="text-center">
          <button 
            className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3"
            onClick={handleClick}
          >
            Back to Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalCost;
