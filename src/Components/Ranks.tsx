import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { Bar } from "react-chartjs-2"; // Using react-chartjs-2 for the bar chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Rewards() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sample data for ranks and amounts
  const ranksData = [
    { name: "Smart_X", amount: 5000, activeUsers: 1200 },
    { name: "Plus_X", amount: 10000, activeUsers: 800 },
    { name: "Pro_X", amount: 15000, activeUsers: 500 },
    { name: "Chief_X", amount: 20000, activeUsers: 300 },
    { name: "Royal_X", amount: 25000, activeUsers: 200 },
    { name: "Empire_X", amount: 30000, activeUsers: 1000 },
  ];

  // Example user (this could come from Web3 or backend)
  const userAddress = "0x1234..."; // Example user address (can be fetched dynamically)
  const userRank = "Plus_X"; // Example rank of the user (can be determined based on data)
  const userAmount =
    ranksData.find((rank) => rank.name === userRank)?.amount || 0;

  // Total amount calculation
  const totalAmount = ranksData.reduce((sum, rank) => sum + rank.amount, 0);

  // Chart data
  const chartData = {
    labels: ranksData.map((rank) => rank.name), // Rank names on X-axis
    datasets: [
      {
        label: "Amount Allocated",
        data: ranksData.map((rank) => rank.amount), // Amount allocated to each rank
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Border color
        borderWidth: 1,
      },
      {
        label: "Active Users",
        data: ranksData.map((rank) => rank.activeUsers), // Active users in each rank
        backgroundColor: "rgba(153, 102, 255, 0.5)", // Bar color for users
        borderColor: "rgba(153, 102, 255, 1)", // Border color for users
        borderWidth: 1,
      },
    ],
  };

  const handleClaim = () => {
    // Here, you could trigger a claim function
    console.log(`Claiming ${userAmount} for rank ${userRank}`);
    // You can replace this with an actual smart contract interaction to claim the amount
  };

  return (
    <div className="flex h-screen relative  text-gray-900 dark:text-slate-300">
      {/* Background Text */}
      <div
        className=" bg-blue-300 absolute top-0 left-0 w-full h-full flex items-center justify-center text-9xl font-light text-blue-900 opacity-20"
        style={{
          zIndex: -1,
        }}
      >
        <div className="h2 overflow-hidden">USDX</div>
      </div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-white dark:bg-gray-900 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        {/* Sidebar placeholder */}
        <div className="hidden lg:block w-64 bg-white shadow-lg md:hidden">
          {/* Sidebar content goes here */}
          <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto dark:bg-gray-900">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          walletAddress={""}
          setWalletAddress={function (): void {
            throw new Error("Function not implemented.");
          }}
          showWalletAddress={false}
        />

        {/* Total Amount Section */}
        <div className="p-6 space-y-4">
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            <h2>Total Amount Allocated to All Ranks: ${totalAmount}</h2>
          </div>

          {/* Graph Section */}
          <div className="p-4 rounded-2xl shadow-lg dark:bg-gray-800 dark:text-gray-200 stake">
            <div className="min-w-300 h-96">
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "Rank Allocation and Active Users",
                    },
                  },
                  maintainAspectRatio: false, // Allow chart to resize based on container
                }}
              />
            </div>
          </div>

          {/* User Rank and Claim Section */}
          <div className="p-8 bg-blue-100 rounded-3xl shadow-2xl flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0 sm:space-x-6 stake">
            {/* Check if userRank is defined and userAmount is greater than 0 */}
            {userRank && userAmount > 0 ? (
              <>
                <div className="flex items-center space-x-6 sm:space-x-12">
                  <div className="bg-blue-300 p-6 rounded-3xl shadow-2xl w-72 sm:w-96">
                    <h3 className="text-3xl font-semibold text-gray-800">
                      {userRank}
                    </h3>
                    <p className="text-xl text-gray-600 mt-2">
                      Allocated Amount:{" "}
                      <span className="font-bold text-green-600">
                        ${userAmount.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-center sm:justify-start">
                  <button
                    onClick={handleClaim}
                    className=" button py-3 px-8 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                  >
                    <strong>Claim Reward</strong>
                  </button>
                </div>
              </>
            ) : (
              <p className="text-white font-semibold text-xl">
                Your rank and allocated amount are not available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
