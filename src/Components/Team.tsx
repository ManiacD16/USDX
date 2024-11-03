import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

const dummyReferralData = [
  { user: "User123", regDate: "2024-09-15", staking: "500 LBC" },
  { user: "CryptoFan", regDate: "2024-09-16", staking: "750 LBC" },
  { user: "BlockchainBob", regDate: "2024-09-17", staking: "1000 LBC" },
  { user: "TokenTrader", regDate: "2024-09-18", staking: "250 LBC" },
  { user: "CoinCollector", regDate: "2024-09-19", staking: "1500 LBC" },
];

const dummyDownlineData = [
  { user: "Alice", level: 1, staking: "300 LBC" },
  { user: "Bob", level: 2, staking: "450 LBC" },
  { user: "Charlie", level: 1, staking: "600 LBC" },
  { user: "David", level: 3, staking: "200 LBC" },
  { user: "Eve", level: 2, staking: "800 LBC" },
];

export default function TeamComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("referral");

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
      <div className="flex-1 overflow-auto">
        <Header
                  isSidebarOpen={isSidebarOpen}
                  setIsSidebarOpen={setIsSidebarOpen} walletAddress={""} setWalletAddress={function (): void {
                      throw new Error("Function not implemented.");
                  } } showWalletAddress={false}        //   toggleSidebar={toggleSidebar}
        />

        {/* Main content area */}
        <main className="min-h-screen bg-transparent p-4">
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="flex">
              <button
                className={`flex-1 py-3 px-4 text-center ${
                  activeTab === "referral"
                    ? "bg-[#2a2a2a] text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white"
                }`}
                onClick={() => setActiveTab("referral")}
              >
                My Directs
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center ${
                  activeTab === "downline"
                    ? "bg-[#2a2a2a] text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white"
                }`}
                onClick={() => setActiveTab("downline")}
              >
                Total Team
              </button>
            </div>
            <div className="p-4">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b dark:border-gray-600">
                    <th className="text-left py-2">User</th>
                    <th className="text-left py-2">
                      {activeTab === "referral" ? "Reg Date" : "Level"}
                    </th>
                    <th className="text-left py-2">Staking</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTab === "referral"
                    ? dummyReferralData.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b dark:border-gray-600"
                        >
                          <td className="py-2">{item.user}</td>
                          <td className="py-2">{item.regDate}</td>
                          <td className="py-2">{item.staking}</td>
                        </tr>
                      ))
                    : dummyDownlineData.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b dark:border-gray-600"
                        >
                          <td className="py-2">{item.user}</td>
                          <td className="py-2">{item.level}</td>
                          <td className="py-2">{item.staking}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}