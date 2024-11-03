import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { ArrowUpIcon } from "lucide-react";

const rewardsData = [
  { type: "weekly", date: "15-Sep-2024", amount: 50 },
  { type: "royalty", date: "10-Sep-2024", amount: 25 },
];

export default function Rewards() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeRewardTable, setActiveRewardTable] = useState("weekly"); // Default to Weekly Rewards

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderRewardContent = () => {
    return (
      <div className="p-4">
        {/* Render Weekly Rewards table */}
        {activeRewardTable === "weekly" && (
          <div>
            {rewardsData.map((reward, index) =>
              reward.type === "weekly" ? (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-2"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-400 rounded-full p-2 mr-4">
                      <ArrowUpIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Weekly Reward
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {reward.date}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-blue-500">
                    ${reward.amount}
                  </p>
                </div>
              ) : null
            )}
          </div>
        )}

        {/* Render Royalty Rewards table */}
        {activeRewardTable === "royalty" && (
          <div>
            {rewardsData.map((reward, index) =>
              reward.type === "royalty" ? (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-2"
                >
                  <div className="flex items-center">
                    <div className="bg-purple-400 rounded-full p-2 mr-4">
                      <ArrowUpIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Royalty Reward
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {reward.date}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-purple-500">
                    ${reward.amount}
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
          <div className="flex mb-4">
            <button
              className={`flex-1 py-2 text-center ${
                activeRewardTable === "weekly"
                  ? "bg-[#2a2a2a] text-white"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setActiveRewardTable("weekly")}
            >
              Weekly Rewards
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                activeRewardTable === "royalty"
                  ? "bg-[#2a2a2a] text-white"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setActiveRewardTable("royalty")}
            >
              Royalty Rewards
            </button>
          </div>
          {renderRewardContent()}
        </div>
      </div>
    </div>
  );
}