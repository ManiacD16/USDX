import { useState, useEffect, useContext } from "react";
import { UserIcon, DollarSign, GitBranchPlus, HandCoins, PiggyBank, Vault, Wallet } from "lucide-react";
import Sidebar from "./sidebar";
import Header from "./header";
import axios from "axios";
import { AuthContext } from "../AuthContext"; // Adjust the path as necessary
import "../App.css";

const EcommerceReferralPage = () => {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dailyROI, setDailyROI] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [investAmount, setInvestAmount] = useState("");
  const [inviteLink] = useState("https://example.com/user/signup?referal=undefined");
  
  const yieldPackages = [
    { name: 'BASIC', investment: 950, yield: 1000 },
    { name: 'STANDARD', investment: 4500, yield: 5000 },
    { name: 'PREMIUM', investment: 8500, yield: 10000 },
  ];

  const [totalIncome, setTotalIncome] = useState(0);
const [totalDeposit, setTotalDeposit] = useState(0);
const [levelIncome, setLevelIncome] = useState(0);

// Fetch or calculate these values as needed, for example:
useEffect(() => {
  // Assume you fetch this data from your API
  const fetchData = async () => {
    const response = await axios.get('/api/user/data');
    setTotalIncome(response.data.totalIncome);
    setTotalDeposit(response.data.totalDeposit);
    setLevelIncome(response.data.levelIncome);
  };
  fetchData();
}, []);


  const fetchDailyROI = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await axios.get('http://localhost:3000/api/investments/daily-roi', { withCredentials: true });
      setDailyROI(response.data.totalROI);
    } catch (error) {
      console.error("Error fetching daily ROI:", error);
    }
  };

  useEffect(() => {
    fetchDailyROI();
  }, [isAuthenticated]);

  // const handleUpdateROI = async () => {
  //   if (!isAuthenticated) return;
  //   try {
  //     await axios.post('http://localhost:3000/api/investments/update-daily-roi', {}, { withCredentials: true });
  //     alert('Daily ROI updated successfully!');
  //     await fetchDailyROI();
  //   } catch (error) {
  //     console.error("Error updating daily ROI:", error);
  //   }
  // };

  const handleWithdraw = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await axios.post('http://localhost:3000/api/investments/withdraw', { amount: withdrawAmount }, { withCredentials: true });
      alert(`Withdrawal successful! New balance: $${response.data.balance}`);
      setWithdrawAmount("");
    } catch (error) {
      console.error("Error during withdrawal:", error);
    }
  };

  const handleInvest = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await axios.post('http://localhost:3000/api/investments/invest', { amount: investAmount }, { withCredentials: true });
      alert(`Investment successful! New balance: $${response.data.balance}`);
      setInvestAmount("");
    } catch (error) {
      console.error("Error during investment:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleBuy = (pkg: { name: any; investment: any; yield?: number; }) => {
    alert(`You have purchased the ${pkg.name} package for $${pkg.investment}.`);
  };
  
  return (
    <div className="flex h-screen relative bg-blue-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <div className={`fixed top-0 left-0 h-full w-64 z-50 bg-white shadow-lg transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      <div className="flex h-screen">
        <div className="hidden lg:block w-64 bg-white shadow-lg md:hidden">
          <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} walletAddress={""} setWalletAddress={() => {}} showWalletAddress={false} />

        <main className="p-6">
  <h2 className="text-2xl font-semibold mb-6 text-shadow">Referral Link</h2>
  <div className="flex items-center bg-blue-300 dark:bg-gray-800 rounded-full border border-gray-300 overflow-hidden mb-6">
    <div className="p-2  border-r border-gray-300 dark:bg-gray-700 bg-blue-300">
      <UserIcon className="h-6 w-6 text-gray-600 " />
    </div>
    <input type="text" value={inviteLink} readOnly className="flex-grow min-w-0 px-3 py-2 text-sm focus:outline-none bg-transparent dark:bg-gray-800" />
    <button onClick={copyToClipboard} className="px-4 py-2 bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-200">COPY</button>
  </div>


<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Daily Dividends Box */}
  <div className="p-6 bg-gradient-to-r from-blue-200 to-blue-400 rounded-2xl shadow-2xl dark:from-blue-900 dark:to-blue-400 flex justify-between items-center">
    
    <div>
      <h2 className="text-lg md:text-2xl font-semibold">Daily Dividends</h2>
      {dailyROI !== null ? (
        <p className="md:text-lg text-2xl font-bold text-green-600">${dailyROI}</p>
      ) : (
        <p className="text-lg">Loading...</p>
      )}
              </div>
              <DollarSign className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
  </div>

  {/* Level Income Box */}
<div className="p-6 bg-gradient-to-r from-blue-200 to-blue-400 rounded-2xl shadow-2xl dark:from-blue-900 dark:to-blue-400 flex justify-between items-center">
  <div>
    <h2 className="text-lg md:text-2xl font-semibold">Level Income</h2>
    <p className="md:text-lg text-2xl font-bold text-green-600">${levelIncome}</p>
  </div>
  <GitBranchPlus className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
</div>


  {/* Total Deposit Box */}
  <div className="p-6 bg-gradient-to-r from-blue-200 to-blue-400 rounded-2xl shadow-2xl dark:from-blue-900 dark:to-blue-400 flex justify-between items-center">
    <div>
      <h2 className="text-lg md:text-2xl font-semibold">Total Deposit</h2>
      <p className="md:text-lg text-2xl font-bold text-green-600">${totalDeposit}</p>
    </div> <Vault className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
  </div>

  {/* Total Income Box */}
  <div className="p-6 bg-gradient-to-r from-blue-200 to-blue-400 rounded-2xl shadow-2xl dark:from-blue-900 dark:to-blue-400 flex justify-between items-center">

    <div>
      <h2 className="text-lg md:text-2xl font-semibold">Total Income</h2>
      <p className="md:text-lg text-2xl font-bold text-green-600">${totalIncome}</p>
              </div>
                  <Wallet className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
  </div>

  {/* Deposit Box */}
  <div className="p-6 bg-gradient-to-r from-blue-200 to-blue-400 rounded-2xl shadow-2xl dark:from-blue-900 dark:to-blue-400 flex flex-col md:flex-row justify-between items-center">
  
  <div className="w-full">
    <div className="flex justify-between items-center">
      <h2 className="text-lg md:text-2xl font-semibold">
        Deposit <span className="ml-0 md:ml-4 mb-2 text-sm text-gray-600 dark:text-gray-300">Minimum: $50 | Maximum: $10,000</span>
      </h2>  
      <PiggyBank className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
    </div>
    <div className="flex flex-col mt-6 md:flex-row">
      <input
        type="number"
        value={investAmount}
        onChange={(e) => setInvestAmount(e.target.value)}
        placeholder="Enter amount to deposit"
        className="border p-2 rounded-xl w-full md:w-1/2 mr-0 md:mr-2 shadow-xl"
      />
      <button onClick={handleInvest} className="mt-2 md:mt-0 px-4 py-2 w-full md:w-1/2 bg-green-600 text-white rounded-xl shadow-xl hover:bg-green-700">
        Deposit
      </button>
    </div>
  </div>
  </div>

  {/* Withdraw Box */}
  <div className="p-6 bg-gradient-to-r from-blue-200 to-blue-400 rounded-2xl shadow-2xl dark:from-blue-900 dark:to-blue-400 flex flex-col md:flex-row justify-between items-center">
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg md:text-2xl font-semibold">Withdraw</h2>
                   <HandCoins className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
                  </div>
      <div className="flex flex-col mt-6 md:flex-row">
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          placeholder="Enter amount to withdraw"
          className="border p-2 rounded-xl w-full md:w-1/2 mr-0 md:mr-2 shadow-xl"
        />
        <button onClick={handleWithdraw} className="mt-2 md:mt-0 px-4 py-2 w-full md:w-1/2 bg-green-600 text-white rounded-xl shadow-xl hover:bg-green-700">Withdraw</button>
      </div>
              </div>
            </div>
</div>
<div className="max-w-7xl mx-auto mt-10 p-5 bg-gradient-to-r from-blue-100 shadow-2xl to-purple-100 dark:from-blue-800 dark:to-purple-800 rounded-2xl">
  <h2 className="text-3xl font-bold text-center mb-5 text-gray-800 dark:text-gray-200">Yield Packages</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {yieldPackages.map((pkg, index) => (
      <div
        key={index}
        className="relative p-4 border border-gray-300 rounded-2xl bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition duration-200 overflow-hidden"
      >
        <div className="absolute inset-0 bg-opacity-30 bg-gradient-to-t from-blue-500 to-transparent dark:from-blue-700 dark:to-transparent"></div>
        <h3 className="text-xl font-semibold relative z-10 text-gray-800 dark:text-gray-200">{pkg.name}</h3>
        <p className="text-gray-700 dark:text-gray-300 relative z-10">Investment: ${pkg.investment}</p>
        <p className="text-gray-700 dark:text-gray-300 relative z-10">Yield: ${pkg.yield}</p>
        <p className="text-gray-700 dark:text-gray-300 relative z-10">Total Return: ${pkg.yield}</p>
        <button
          onClick={() => handleBuy(pkg)}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-200 relative z-10"
        >
          Buy Now
        </button>
      </div>
    ))}
  </div>
  <div className="mt-5 text-center">
    <p className="text-sm text-gray-500 dark:text-gray-400">All incentives available at initiation only.</p>
  </div>
</div>


        </main>
      </div>
    </div>
  );
};

export default EcommerceReferralPage;
