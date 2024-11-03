import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
// import Logo from "./Images/Logo.svg";

export default function RegistrationForm() {
  const { register } = useContext(AuthContext)!;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [referralAddress, setReferralAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const referral = queryParams.get('referral');

    if (referral) {
      setReferralAddress(referral);
    }
  }, []);

 const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    await register(email, password);
    alert('Registration successful!');
    navigate('/user'); // Redirect only on success
  } catch (error: any) {
    console.error('Error during registration:', error);
    alert(error.message); // Show the error message from the thrown error
    // No navigation, user remains on the registration page
  }
};


  const handleConnectWallet = async () => {
    setIsPopupVisible(false);
    navigate('/next-page');
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="flex items-center justify-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">TMC</h1>
            <p className="text-teal-400 text-sm tracking-wider">Trade Market Cap</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">Create Your Account Now</h2>
        <p className="text-gray-400 mb-8">With Your Desired Wallet</p>

        <form onSubmit={handleRegister}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-gray-700 text-white rounded px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              className="w-full bg-gray-700 text-white rounded px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded mb-4 transition duration-300"
          >
            REGISTER
          </button>
        </form>

        <button
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded mb-4 transition duration-300"
          onClick={() => navigate("/login")}
        >
          ALREADY REGISTERED? SIGN IN
        </button>

        {isPopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold text-white mb-2">Connect Your Wallet</h2>
              <p className="text-gray-400 mb-4">Please connect your wallet to proceed.</p>
              <button
                onClick={handleConnectWallet}
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-500 transition duration-300"
              >
                Connect Wallet
              </button>
              <button
                onClick={handleClosePopup}
                className="mt-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
