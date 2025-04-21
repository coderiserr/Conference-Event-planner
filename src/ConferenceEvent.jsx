import React, { useState } from "react";
import TotalCost from "./TotalCost";
import Auth from "./Auth";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice";
import { toggleMealSelection } from "./mealsSlice";

const ConferenceEvent = () => {
    const [showItems, setShowItems] = useState(false);
    const [activeSection, setActiveSection] = useState('venue');
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [showAuth, setShowAuth] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');

    const venueItems = useSelector((state) => state.venue);
    const avItems = useSelector((state) => state.av);
    const mealsItems = useSelector((state) => state.meals);
    const dispatch = useDispatch();
    const remainingAuditoriumQuantity = 3 - venueItems.find(item => item.name === "Auditorium Hall (Capacity:200)").quantity;

    const handleAuth = (formData) => {
        // Here you would typically handle authentication with a backend
        setIsAuthenticated(true);
        setUserName(formData.name || formData.email);
        setShowAuth(false);
    };

    const handleToggleItems = () => {
        setShowItems(!showItems);
    };

    const handleAddToCart = (index) => {
        if (venueItems[index].name === "Auditorium Hall (Capacity:200)" && venueItems[index].quantity >= 3) {
            return;
        }
        dispatch(incrementQuantity(index));
    };

    const handleRemoveFromCart = (index) => {
        if (venueItems[index].quantity > 0) {
            dispatch(decrementQuantity(index));
        }
    };

    const handleIncrementAvQuantity = (index) => {
        dispatch(incrementAvQuantity(index));
    };

    const handleDecrementAvQuantity = (index) => {
        dispatch(decrementAvQuantity(index));
    };

    const handleMealSelection = (index) => {
        dispatch(toggleMealSelection(index));
    };

    const getItemsFromTotalCost = () => {
        const items = [];
        venueItems.forEach((item) => {
            if (item.quantity > 0) {
                items.push({ ...item, type: "venue" });
            }
        });
        avItems.forEach((item) => {
            if (item.quantity > 0) {
                items.push({ ...item, type: "av" });
            }
        });
        mealsItems.forEach((item) => {
            if (item.selected) {
                items.push({ ...item, type: "meals" });
            }
        });
        return items;
    };

    const items = getItemsFromTotalCost();

    const ItemsDisplay = ({ items }) => {
        return (
            <div className="overflow-x-auto">
                {items.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No items selected</p>
                )}
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {items.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.cost}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.type === "meals" ? `For ${numberOfPeople} people` : item.quantity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ${item.type === "meals" ? item.cost * numberOfPeople : item.cost * item.quantity}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const calculateTotalCost = (section) => {
        let totalCost = 0;
        if (section === "venue") {
            venueItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            });
        } else if (section === "av") {
            avItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            });
        } else if (section === "meals") {
            mealsItems.forEach((item) => {
                if (item.selected) {
                    totalCost += item.cost * numberOfPeople;
                }
            });
        }
        return totalCost;
    };

    const venueTotalCost = calculateTotalCost("venue");
    const avTotalCost = calculateTotalCost("av");
    const mealsTotalCost = calculateTotalCost("meals");

    const totalCosts = {
        venue: venueTotalCost,
        av: avTotalCost,
        meals: mealsTotalCost,
    };

    const navigateToSection = (section) => {
        setActiveSection(section);
        if (showItems) {
            setShowItems(false);
        }
    };

    return (
        <>
            <nav className="bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 sm:mb-0">
                        <img 
                            src="/conference_event_planner_logo_all_text_is_white-removebg-preview.png" 
                            alt="Conference Expense Planner Logo"
                            className="h-10 sm:h-12"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="flex space-x-4">
                            <a 
                                href="#venue" 
                                onClick={() => navigateToSection('venue')} 
                                className={`text-gray-600 hover:text-primary ${activeSection === 'venue' ? 'text-primary font-semibold' : ''}`}
                            >
                                Venue
                            </a>
                            <a 
                                href="#addons" 
                                onClick={() => navigateToSection('addons')} 
                                className={`text-gray-600 hover:text-primary ${activeSection === 'addons' ? 'text-primary font-semibold' : ''}`}
                            >
                                Add-ons
                            </a>
                            <a 
                                href="#meals" 
                                onClick={() => navigateToSection('meals')} 
                                className={`text-gray-600 hover:text-primary ${activeSection === 'meals' ? 'text-primary font-semibold' : ''}`}
                            >
                                Meals
                            </a>
                        </div>
                        <div className="flex items-center space-x-4">
                            {isAuthenticated ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-600">Welcome, {userName}</span>
                                    <button 
                                        className="btn-secondary"
                                        onClick={() => setIsAuthenticated(false)}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    className="btn-primary"
                                    onClick={() => setShowAuth(true)}
                                >
                                    Sign Up
                                </button>
                            )}
                            <button 
                                className="btn-accent"
                                onClick={handleToggleItems}
                            >
                                Show Details
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {showAuth && (
                <Auth
                    onClose={() => setShowAuth(false)}
                    onAuth={handleAuth}
                />
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {!showItems ? (
                    <div className="space-y-8">
                        {activeSection === 'venue' && (
                            <div id="venue" className="space-y-6">
                                <h1 className="text-3xl font-bold text-gray-900">Venue Room Selection</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {venueItems.map((item, index) => (
                                        <div className="card" key={index}>
                                            <img 
                                                src={item.img} 
                                                alt={item.name} 
                                                className="w-full h-48 object-cover rounded-lg mb-4"
                                            />
                                            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                                            <p className="text-2xl font-bold text-primary mb-4">${item.cost}</p>
                                            <div className="flex items-center justify-center space-x-4">
                                                <button
                                                    className={`btn ${item.quantity === 0 ? 'bg-gray-300' : 'bg-red-500 hover:bg-red-600'}`}
                                                    onClick={() => handleRemoveFromCart(index)}
                                                    disabled={item.quantity === 0}
                                                >
                                                    &#8211;
                                                </button>
                                                <span className="text-xl font-semibold">
                                                    {item.quantity > 0 ? item.quantity : "0"}
                                                </span>
                                                <button
                                                    className={`btn ${item.quantity === 10 ? 'bg-gray-300' : 'bg-green-500 hover:bg-green-600'}`}
                                                    onClick={() => handleAddToCart(index)}
                                                    disabled={item.quantity === 10}
                                                >
                                                    &#43;
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-2xl font-bold text-primary text-right">
                                    Total Cost: ${venueTotalCost}
                                </div>
                            </div>
                        )}

                        {activeSection === 'addons' && (
                            <div id="addons" className="space-y-6">
                                <h1 className="text-3xl font-bold text-gray-900">Add-ons Selection</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {avItems.map((item, index) => (
                                        <div className="card" key={index}>
                                            <img 
                                                src={item.img} 
                                                alt={item.name} 
                                                className="w-full h-48 object-cover rounded-lg mb-4"
                                            />
                                            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                                            <p className="text-2xl font-bold text-primary mb-4">${item.cost}</p>
                                            <div className="flex items-center justify-center space-x-4">
                                                <button
                                                    className="btn bg-red-500 hover:bg-red-600"
                                                    onClick={() => handleDecrementAvQuantity(index)}
                                                >
                                                    &#8211;
                                                </button>
                                                <span className="text-xl font-semibold">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    className="btn bg-green-500 hover:bg-green-600"
                                                    onClick={() => handleIncrementAvQuantity(index)}
                                                >
                                                    &#43;
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-2xl font-bold text-primary text-right">
                                    Total Cost: ${avTotalCost}
                                </div>
                            </div>
                        )}

                        {activeSection === 'meals' && (
                            <div id="meals" className="space-y-6">
                                <h1 className="text-3xl font-bold text-gray-900">Meals Selection</h1>
                                <div className="max-w-md mx-auto">
                                    <div className="mb-6">
                                        <label htmlFor="numberOfPeople" className="label">Number of People</label>
                                        <input
                                            type="number"
                                            id="numberOfPeople"
                                            value={numberOfPeople}
                                            onChange={(e) => setNumberOfPeople(parseInt(e.target.value) || 1)}
                                            min="1"
                                            className="input"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {mealsItems.map((item, index) => (
                                        <div 
                                            className={`card cursor-pointer transition-all duration-200 ${
                                                item.selected ? 'ring-2 ring-primary' : ''
                                            }`}
                                            key={index}
                                            onClick={() => handleMealSelection(index)}
                                        >
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`meal_${index}`}
                                                    checked={item.selected}
                                                    onChange={() => handleMealSelection(index)}
                                                    className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded mr-3"
                                                />
                                                <label htmlFor={`meal_${index}`} className="text-lg font-medium">
                                                    {item.name}
                                                </label>
                                            </div>
                                            <p className="text-xl font-bold text-primary mt-2">
                                                ${item.cost} per person
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-2xl font-bold text-primary text-right">
                                    Total Cost: ${mealsTotalCost}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-soft p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                        <ItemsDisplay items={items} />
                        <div className="mt-8 text-right">
                            <p className="text-xl font-semibold text-gray-700">
                                Total: ${totalCosts.venue + totalCosts.av + totalCosts.meals}
                            </p>
                            <button 
                                className="btn-primary mt-4"
                                onClick={handleToggleItems}
                            >
                                Back to Selection
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ConferenceEvent;
