import React, { useState } from "react";
import "./ConferenceEvent.css";
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
            <div className="display_box1">
                {items.length === 0 && <p>No items selected</p>}
                <table className="table_item_data">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Unit Cost</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>${item.cost}</td>
                                <td>{item.type === "meals" ? `For ${numberOfPeople} people` : item.quantity}</td>
                                <td>${item.type === "meals" ? item.cost * numberOfPeople : item.cost * item.quantity}</td>
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
            <navbar className="navbar_event_conference">
                <div className="logo-container">
                    <img 
                        src="/conference_event_planner_logo_all_text_is_white-removebg-preview.png" 
                        alt="Conference Expense Planner Logo"
                        className="original-color"
                    />
                </div>
                <div className="left_navbar">
                    <div className="nav_links">
                        <a href="#venue" onClick={() => navigateToSection('venue')} className={activeSection === 'venue' ? 'active' : ''}>Venue</a>
                        <a href="#addons" onClick={() => navigateToSection('addons')} className={activeSection === 'addons' ? 'active' : ''}>Add-ons</a>
                        <a href="#meals" onClick={() => navigateToSection('meals')} className={activeSection === 'meals' ? 'active' : ''}>Meals</a>
                    </div>
                    <div className="auth-buttons">
                        {isAuthenticated ? (
                            <div className="user-info">
                                <span>Welcome, {userName}</span>
                                <button className="auth-btn" onClick={() => setIsAuthenticated(false)}>
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <button className="auth-btn" onClick={() => setShowAuth(true)}>
                                Sign Up
                            </button>
                        )}
                        <button className="details_button" onClick={handleToggleItems}>
                            Show Details
                        </button>
                    </div>
                </div>
            </navbar>

            {showAuth && (
                <Auth
                    onClose={() => setShowAuth(false)}
                    onAuth={handleAuth}
                />
            )}

            <div className="main_container">
                {!showItems ? (
                    <div className="items-information">
                        {activeSection === 'venue' && (
                            <div id="venue" className="venue_container container_main">
                                <div className="text">
                                    <h1>Venue Room Selection</h1>
                                </div>
                                <div className="venue_selection">
                                    {venueItems.map((item, index) => (
                                        <div className="venue_main" key={index}>
                                            <div className="img">
                                                <img src={item.img} alt={item.name} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                            <div>${item.cost}</div>
                                            <div className="button_container">
                                                {item.name === "Auditorium Hall (Capacity:200)" ? (
                                                    <>
                                                        <button
                                                            className={item.quantity === 0 ? "btn-warning btn-disabled" : "btn-minus btn-warning"}
                                                            onClick={() => handleRemoveFromCart(index)}
                                                        >
                                                            &#8211;
                                                        </button>
                                                        <span className="selected_count">
                                                            {item.quantity > 0 ? ` ${item.quantity}` : "0"}
                                                        </span>
                                                        <button
                                                            className={remainingAuditoriumQuantity === 0 ? "btn-success btn-disabled" : "btn-success btn-plus"}
                                                            onClick={() => handleAddToCart(index)}
                                                        >
                                                            &#43;
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            className={item.quantity === 0 ? "btn-warning btn-disabled" : "btn-warning btn-minus"}
                                                            onClick={() => handleRemoveFromCart(index)}
                                                        >
                                                            &#8211;
                                                        </button>
                                                        <span className="selected_count">
                                                            {item.quantity > 0 ? ` ${item.quantity}` : "0"}
                                                        </span>
                                                        <button
                                                            className={item.quantity === 10 ? "btn-success btn-disabled" : "btn-success btn-plus"}
                                                            onClick={() => handleAddToCart(index)}
                                                        >
                                                            &#43;
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="total_cost">Total Cost: ${venueTotalCost}</div>
                            </div>
                        )}

                        {activeSection === 'addons' && (
                            <div id="addons" className="venue_container container_main">
                                <div className="text">
                                    <h1>Add-ons Selection</h1>
                                </div>
                                <div className="addons_selection">
                                    {avItems.map((item, index) => (
                                        <div className="av_data venue_main" key={index}>
                                            <div className="img">
                                                <img src={item.img} alt={item.name} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                            <div>${item.cost}</div>
                                            <div className="addons_btn">
                                                <button className="btn-warning" onClick={() => handleDecrementAvQuantity(index)}>&#8211;</button>
                                                <span className="quantity-value">{item.quantity}</span>
                                                <button className="btn-success" onClick={() => handleIncrementAvQuantity(index)}>&#43;</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="total_cost">Total Cost: ${avTotalCost}</div>
                            </div>
                        )}

                        {activeSection === 'meals' && (
                            <div id="meals" className="venue_container container_main">
                                <div className="text">
                                    <h1>Meals Selection</h1>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="numberOfPeople"><h3>Number of People:</h3></label>
                                    <input
                                        type="number"
                                        className="input_box5"
                                        id="numberOfPeople"
                                        value={numberOfPeople}
                                        onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                                        min="1"
                                    />
                                </div>
                                <div className="meal_selection">
                                    {mealsItems.map((item, index) => (
                                        <div className="meal_item" key={index}>
                                            <div className="inner">
                                                <input
                                                    type="checkbox"
                                                    id={`meal_${index}`}
                                                    checked={item.selected}
                                                    onChange={() => handleMealSelection(index)}
                                                />
                                                <label htmlFor={`meal_${index}`}>{item.name}</label>
                                            </div>
                                            <div className="meal_cost">${item.cost}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="total_cost">Total Cost: ${mealsTotalCost}</div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="total_amount_detail">
                        <TotalCost
                            totalCosts={totalCosts}
                            handleClick={handleToggleItems}
                            ItemsDisplay={() => <ItemsDisplay items={items} />}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default ConferenceEvent;
