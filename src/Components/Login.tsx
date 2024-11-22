import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useAuth } from "../AuthContext";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react"; // To get wallet address

export default function LoginScreen() {
  const { StoreTokenInLS } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { dispatch } = useContext(UserContext);
  const { address } = useWeb3ModalAccount(); // Get the connected wallet address
  const { open } = useWeb3Modal(); // Web3Modal instance to open and close modal

  const handleConnectWallet = () => {
    open(); // This will open the Web3Modal for wallet connection
  };

  const loginUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous errors

    if (!address) {
      setError("Please connect your wallet first.");
      setIsLoading(false);
      return;
    }

    try {
      // Make the POST request with the wallet address and password
      const res = await fetch("https://tmc-phi.vercel.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, password }),
        credentials: "include", // Make sure cookies are included in the request
      });

      const data = await res.json();

      if (!res.ok) {
        // If the account is not registered or credentials are invalid
        if (data.error === "Account not found") {
          // Redirect to registration if the account doesn't exist
          window.alert("Account not found, redirecting to registration.");
          navigate("/register");
          setIsLoading(false);
          return;
        }
        throw new Error(data.error || "Invalid Credentials");
      }

      // Successful login
      dispatch({ type: "USER", payload: true }); // Update user context or state
      window.alert("Login Successful");

      // Log token and user info
      console.log("Token from server:", data.token); // Log token directly from response
      console.log("User address:", data.user.address); // Log user wallet address
      StoreTokenInLS(data.token);

      navigate("/user"); // Navigate to user dashboard or other page
    } catch (error: any) {
      console.error("Error during login:", error);
      setError(error.message); // Set error message to show in UI
      window.alert(error.message); // Show the error message in alert
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="flex items-center justify-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">TMC</h1>
            <p className="text-teal-400 text-sm tracking-wider">
              Trade Market Cap
            </p>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-white mb-8 text-center">
          Welcome Back!
        </h2>

        <form onSubmit={loginUser}>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Wallet Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full bg-gray-700 text-white rounded px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your wallet address"
              value={address || ""} // Display wallet address if connected
              disabled={true} // Address is fetched from Web3Modal, so it's not editable
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Password
            </label>
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
            {isLoading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        <div className="border-t border-gray-700 my-6">
          {!address && (
            <button
              onClick={handleConnectWallet}
              className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded mb-4 transition duration-300"
            >
              CONNECT WALLET
            </button>
          )}
        </div>

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
