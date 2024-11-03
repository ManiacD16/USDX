import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { ArrowUpIcon } from "lucide-react";

const transactions = [
  { type: "staked", date: "29-Aug-2024 12:51:03", amount: 100 },
  { type: "affiliateStaked", date: "15-Sep-2024 11:32:32", amount: 50 },
];

export default function Stake() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeStakeTable, setActiveStakeTable] = useState("stake"); // Default to Stake

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderStakeContent = () => {
    return (
      <div className="p-4">
        {/* Render Stake table */}
        {activeStakeTable === "stake" && (
          <div>
            {transactions.map((transaction, index) =>
              transaction.type === "staked" ? (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-2"
                >
                  <div className="flex items-center">
                    <div className="bg-yellow-400 rounded-full p-2 mr-4">
                      <ArrowUpIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Staked
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-yellow-500">
                    ${transaction.amount}
                  </p>
                </div>
              ) : null
            )}
          </div>
        )}

        {/* Render Affiliate Stake table */}
        {activeStakeTable === "affiliateStaked" && (
          <div>
            {transactions.map((transaction, index) =>
              transaction.type === "affiliateStaked" ? (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-2"
                >
                  <div className="flex items-center">
                    <div className="bg-green-400 rounded-full p-2 mr-4">
                      <ArrowUpIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Affiliate Staked
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-green-500">
                    ${transaction.amount}
                  </p>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen relative dark:bg-gray-900 text-gray-900 dark:text-slate-300">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-white dark:bg-gray-900 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        {/* Sidebar placeholder */}
        <div className="hidden lg:block w-64 bg-white shadow-lg md:hidden">
          {/* Sidebar content goes here */}
          <Sidebar setIsSidebarOpen={setIsSidebarOpen}/>
          
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto dark:bg-gray-900">
        <Header
          isSidebarOpen={isSidebarOpen}
                  setIsSidebarOpen={setIsSidebarOpen}
                  walletAddress={""} setWalletAddress={function (): void {
                      throw new Error("Function not implemented.");
                  } } showWalletAddress={false}    
        //   toggleSidebar={toggleSidebar}
        />

        <div className="ml-6 mr-6 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mt-6">
          <div className="flex">
            {["stake", "affiliateStaked"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-3 px-4 text-center ${
                  activeStakeTable === tab
                    ? "bg-[#2a2a2a] text-white"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setActiveStakeTable(tab)}
              >
                {tab === "stake" ? "Stake" : "Affiliate Staked"}
              </button>
            ))}
          </div>
          {renderStakeContent()}
        </div>
      </div>
    </div>
  );
}