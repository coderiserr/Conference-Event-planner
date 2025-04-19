import React from 'react';
import './TotalCost.css';

const TotalCost = ({ totalCosts, handleClick, ItemsDisplay }) => {
  return (
    <div className="pricing-app">
      <div className="display_box">
        <div className="header">
          <p className="preheading">Total Cost</p>
          <div className="price">
            ${totalCosts.venue + totalCosts.av + totalCosts.meals}
          </div>
        </div>

        <div className="cost-breakdown">
          <p>Venue: ${totalCosts.venue}</p>
          <p>Add-ons: ${totalCosts.av}</p>
          <p>Meals: ${totalCosts.meals}</p>
        </div>

        <div className="render_items">
          <ItemsDisplay />
        </div>

        <button className="back-button" onClick={handleClick}>
          Back to Selection
        </button>
      </div>
    </div>
  );
};

export default TotalCost;
