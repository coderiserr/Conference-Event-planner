import React, { useState } from 'react';

const Auth = ({ onClose, onAuth }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-soft p-8 max-w-md w-full mx-4 relative">
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isSignIn && (
            <div className="space-y-2">
              <label htmlFor="name" className="label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isSignIn}
                className="input"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full mt-6"
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        
        <p className="text-center mt-4 text-gray-600">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button
            className="text-primary hover:text-primary-dark font-semibold"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth; 