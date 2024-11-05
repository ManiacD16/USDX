import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useAuth } from "../AuthContext";
// import Logo from "./Images/Logo.svg";

export default function LoginScreen() {
const {StoreTokenInLS} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useContext(UserContext);

const loginUser = async (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  setIsLoading(true);
  setError(""); // Clear previous errors

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Make sure cookies are included in the request
    });

    const data = await res.json();

    if (!res.ok) { // Check if the response status is not OK (e.g., 400, 401)
      throw new Error(data.error || "Invalid Credentials");  // The server's error message is in `data.error`
    }

    // Successful login
    dispatch({ type: "USER", payload: true }); // Update user context or state
    window.alert("Login Successful");

    // Log token and user info
    console.log("Token from server:", data.token); // Log token directly from response
    console.log("User email:", data.user.email);  // Log user email
    StoreTokenInLS(data.token);
    // Optional: You could save the token in localStorage or cookies here for further requests
    // localStorage.setItem('token', data.token);

    navigate("/user");  // Navigate to user dashboard or other page

  } catch (error: any) {
    console.error("Error during login:", error);
    setError(error.message); // Set error message to show in UI
    window.alert(error.message); // Show the error message in alert
  } finally {
    setIsLoading(false);
  }
};
  // console.log('Response from server', loginUser);


  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="flex items-center justify-center mb-8">
          {/* <div className="w-12 h-12 mr-2">
            <img
              src={Logo}
              alt="HBTC Logo"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-2"
            />
          </div> */}
          <div>
            <h1 className="text-3xl font-bold text-white">TMC</h1>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-white mb-8 text-center">Welcome Back!</h2>

        <form onSubmit={loginUser}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
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