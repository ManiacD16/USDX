import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext"; // Import useAuth hook
import { UserIcon, DollarSign, GitBranchPlus, HandCoins, PiggyBank, Vault, Wallet } from "lucide-react";
import Sidebar from "./sidebar";
import Header from "./header";
import "../App.css";

const EcommerceReferralPage = () => {
  const { isAuthenticated, token: userToken } = useAuth(); // Access token and isAuthenticated from AuthContext
  // const [totalInvestment, setTotalInvestment] = useState(0);
   const [investmentTotal, setInvestmentTotal] = useState(null);  // State to store the user's investment total
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dailyROI, setDailyROI] = useState<number | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [userInvestmentTotal, setUserInvestmentTotal] = useState(0); // State for user's total investment
  const [rankReward, setRankReward] = useState(null);
  // const [userInvestmentTotal, setUserInvestmentTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [investAmount, setInvestAmount] = useState("");
  const [inviteLink] = useState("https://example.com/user/signup?referal=undefined");

  const yieldPackages = [
    { name: 'BASIC', investment: 950, yield: 1000 },
    { name: 'STANDARD', investment: 4500, yield: 5000 },
    { name: 'PREMIUM', investment: 8500, yield: 10000 },
  ];

 const [selectedPackage, setSelectedPackage] = useState('');
  const [totalIncome, setTotalIncome] = useState(0);
  // const [totalDeposit, setTotalDeposit] = useState(0);
  // const [levelIncome, setLevelIncome] = useState(0);
  const [error, setError] = useState<string | null>(null);
   const [roiData, setRoiData] = useState(null);
  const [totalROI, setTotalROI] = useState(0);  // State to store total ROI

  // Fetch total income, total deposit, and level income
useEffect(() => {
    const calculateROI = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/investments/calculate-level-roi', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`, // Include user token for authentication
          }
        });

        const data = await response.json();

        if (response.ok) {
          setRoiData(data);  // Set the ROI data from the response
          
          // Calculate the total ROI (you can modify this logic as needed)
          const total = data.roi + data.referralInvestments.reduce((acc: any, referral: { roi: any; }) => acc + referral.roi, 0);
          setTotalROI(total);  // Set the total ROI including user and referral investments
        } else {
          setError(data.error);  // Handle errors from backend
        }
      } catch (error: any) {
        setError('Network error: ' + error.message);  // Handle network errors
      } finally {
        setLoading(false);  // Stop loading when the data is fetched or an error occurs
      }
    };

    if (isAuthenticated && userToken) {
      calculateROI();
    }
  }, [isAuthenticated, userToken]); // Re-fetch if token or auth status changes



 // Fetch the investment total from localStorage when the component mounts
  const fetchInvestmentTotal = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/investments/total-investment', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch investment total');
      }

      const data = await response.json();
      setInvestmentTotal(data.investmentTotal); // Set the user's total investment
    } catch (error) {
      console.error('Error fetching investment total:', error);
      postMessage('Failed to load investment total.');
    }
  };

  // Fetch investment total when component mounts
  useEffect(() => {
    fetchInvestmentTotal();
  }, []);

  // Fetch daily ROI
  const fetchDailyROI = async () => {
  if (!isAuthenticated) return; // If not authenticated, don't proceed

  try {
    console.log('Fetching daily ROI...');
    const response = await fetch('http://localhost:3000/api/investments/daily-roi', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response Status:', response.status); // Log the status code for more insight

    if (!response.ok) {
      const errorText = await response.text(); // Log the response body in case of failure
      console.error('Error Response:', errorText);
      throw new Error('Failed to fetch daily ROI');
    }

    const data = await response.json();
    console.log('Daily ROI Data:', data); // Log the data to see the actual response

    setDailyROI(data.totalROI); // Assuming the response has a field 'totalROI'
  } catch (error: any) {
    console.error('Error fetching daily ROI:', error.message); // Use .message to log the specific error
  }
};

useEffect(() => {
  fetchDailyROI();
}, [isAuthenticated, userToken]);

  // Handle Withdraw action
  const withdraw = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await fetch('http://localhost:3000/api/investments/withdraw', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: withdrawAmount }),
      });

      if (!response.ok) throw new Error('Failed to withdraw');

      const data = await response.json();
      alert(`Withdrawal successful! New balance: $${data.balance}`);
      setWithdrawAmount(""); // Reset withdraw amount input
    } catch (error) {
      console.error("Error during withdrawal:", error);
    }
  };

  // Handle Investment action
const invest = async () => {
  if (!isAuthenticated) return;

  try {
    // Parse and validate the investment amount
    const numericAmount = parseFloat(investAmount);  // Ensure it's a number
    if (isNaN(numericAmount)) {
      alert('Invalid investment amount');
      return;
    }

    // Send investment request to backend
    const response = await fetch('http://localhost:3000/api/investments/invest', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: numericAmount, packageType: selectedPackage }),
    });

    if (!response.ok) throw new Error('Failed to invest');

    const data = await response.json();
    console.log('Response Data:', data);  // Debugging step

    // Handle backend response:
    if (data.newActiveInvestmentTotal !== undefined) {
      // Notify the user that the investment was successful
      alert(`Investment successful! New total active investment: $${data.newActiveInvestmentTotal}`);

      // Update frontend state based on the response
      setUserInvestmentTotal(data.userInvestmentTotal); // Update the user's total investment
      setTotalIncome(data.newActiveInvestmentTotal);     // Update the total active investment

      // Optionally, store the new investment total in localStorage (if needed)
      // localStorage.setItem('InvestmentTotal', data.userInvestmentTotal.toString());

      // Display the yield package details (optional)
      if (data.yieldPackage) {
        const { name, yield: yieldRate } = data.yieldPackage;
        alert(`You invested in the ${name} with a ${yieldRate * 100}% yield.`); // Show the yield info
      }

      // Reload the page or update the UI as necessary
      window.location.reload();
    } else {
      alert('Investment successful, but no new total active investment returned.');
    }
  } catch (error) {
    console.error('Invest error:', error);
    setError('Failed to invest');
  }
};


const fetchRankReward = async (): Promise<any> => {
  try {
    const response = await fetch('http://localhost:3000/api/investments/rank-reward', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userToken}`, // Assuming you store the token in localStorage
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch rank reward');
    }

    const data = await response.json();

    // Render data in frontend (example)
    console.log(data); // Display the rank reward info or update the UI accordingly
    alert(`Your current reward for ${data.rank} is: $${data.claimedReward || 0}`);
    return data; // Return the data value
  } catch (error) {
    console.error("Error fetching rank reward:", error);
    alert("Error fetching rank reward");
  }
}

useEffect(() => {
  fetchRankReward().then((data) => setRankReward(data));
}, []);

  // Copy invite link to clipboard
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

  // Handle package purchase
  const handleBuy = (pkg: { name: string; investment: number; yield?: number }) => {
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
            <div className="p-2 border-r border-gray-300 dark:bg-gray-700 bg-blue-300">
              <UserIcon className="h-6 w-6 text-gray-600" />
            </div>
            <input type="text" value={inviteLink} readOnly className="flex-grow min-w-0 px-3 py-2 text-sm focus:outline-none bg-transparent dark:bg-gray-800" />
            <button onClick={copyToClipboard} className="px-4 py-2 bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-200">COPY</button>
          </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Daily Dividends Box */}
          <div className="p-6 border border-blue-400 bg-gradient-to-r from-blue-200 to-blue-400 rounded-2xl shadow-2xl dark:from-blue-900 dark:to-blue-400 flex justify-between items-center mb-6">
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
          <div className="p-6 border border-blue-400 bg-gradient-to-r from-blue-200 to-blue-400 rounded-2xl shadow-2xl dark:from-blue-900 dark:to-blue-400 flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg md:text-2xl font-semibold">Level Income</h2>
              <p className="md:text-lg text-2xl font-bold text-green-600">${totalROI}</p>
            </div>
            <GitBranchPlus className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
            </div>
            
            {/* Level Income Box */}
          <div className="p-6 border border-blue-400 bg-gradient-to-r from-blue-200 to-blue-400 rounded-2xl shadow-2xl dark:from-blue-900 dark:to-blue-400 flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg md:text-2xl font-semibold">Rank Rewards</h2>
              <p className="md:text-lg text-2xl font-bold text-green-600">${rankReward}</p>
            </div>
            <GitBranchPlus className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
          </div>

          {/* Total Deposit Box */}
          <div className="p-6 border border-blue-400 bg-gradient-to-r from-blue-200 to-blue-400 rounded-2xl shadow-2xl dark:from-blue-900 dark:to-blue-400 flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg md:text-2xl font-semibold">Total Deposit</h2>
              <p className="md:text-lg text-2xl font-bold text-green-600">${investmentTotal}</p>
            </div>
            <Vault className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
          </div>

          {/* Total Income Box */}
          <div className="p-6 border border-blue-400 bg-gradient-to-r from-blue-200 to-blue-400 rounded-2xl shadow-2xl dark:from-blue-900 dark:to-blue-400 flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg md:text-2xl font-semibold">Total Income</h2>
              <p className="md:text-lg text-2xl font-bold text-green-600">${totalIncome}</p>
            </div>
            <Wallet className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
          </div>

          {/* Deposit Box */}
          <div className="p-6 bg-gradient-to-r from-blue-200 to-blue-400 rounded-2xl shadow-2xl dark:from-blue-900 dark:to-blue-400 flex flex-col md:flex-row justify-between items-center mb-6 border border-blue-400">
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
                <button onClick={invest} className="mt-2 md:mt-0 px-4 py-2 w-full md:w-1/2 bg-green-600 text-white rounded-xl shadow-xl hover:bg-green-700">
                  Deposit
                </button>
              </div>
            </div>
          </div>

          {/* Withdraw Box */}
          <div className="p-6 bg-gradient-to-r border border-blue-400 from-blue-200 to-blue-400 rounded-2xl shadow-2xl dark:from-blue-900 dark:to-blue-400 flex flex-col md:flex-row justify-between items-center mb-6">
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
                <button onClick={withdraw} className="mt-2 md:mt-0 px-4 py-2 w-full md:w-1/2 bg-green-600 text-white rounded-xl shadow-xl hover:bg-green-700">Withdraw</button>
              </div>
            </div>
          </div>
          </div>
          {/* Yield Packages Section */}
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
