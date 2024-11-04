import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../AuthContext'; // Import AuthContext
import { NavLink, useNavigate } from "react-router-dom";

import { UserContext } from "../App";
import Logo from "./Images/Logo.svg";

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const { login } = useContext(AuthContext)!; // Use non-null assertion if you're sure context is defined
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
    const { state, dispatch } = useContext(UserContext);

    const loginUser = async (e: { preventDefault: () => void; }) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // This is crucial for cookies
    });

    const data = await res.json();
    console.log("Response data:", data); // For debugging

    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Login Successful");
      navigate("/user");
    }
  } catch (error) {
    console.error("Error during login:", error);
    window.alert("An error occurred. Please try again.");
  }
};


    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 mr-2">
              <img
                src={Logo}
                alt="HBTC Logo"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-2"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">TMC</h1>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white mb-8 text-center">Welcome Back!</h2>

          <form onSubmit={loginUser}> {/* Change onClick to onSubmit */}
            {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full bg-gray-700 text-white rounded px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full bg-gray-700 text-white rounded px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded transition duration-300 flex items-center justify-center"
            >
              {isLoading ? 'Logging in...' : 'LOGIN'}
            </button>
          </form>

          <div className="border-t border-gray-700 my-6"></div>

          <button
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded mb-4 transition duration-300"
            onClick={() => navigate("/register")}
          >
            Don't Have an Account? Sign Up
          </button>
        </div>
      </div>
    );
}