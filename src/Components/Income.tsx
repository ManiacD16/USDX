import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { ArrowDownIcon } from "lucide-react";

const transactions = [
  { type: "directIncome", date: "20-Sep-2024 09:12:00", amount: 50 },
  { type: "levelIncome", date: "21-Sep-2024 15:00:00", amount: 30 },
];

export default function Income() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeIncomeTable, setActiveIncomeTable] = useState("directIncome"); // Default to Direct Income

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderIncomeContent = () => {
    return (
      <div className="p-4">
        {/* Render Direct Income table */}
        {activeIncomeTable === "directIncome" && (
          <div>
            {transactions.map((transaction, index) =>
              transaction.type === "directIncome" ? (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-2"
                >
                  <div className="flex items-center">
                    <div className="bg-green-400 rounded-full p-2 mr-4">
                      <ArrowDownIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Direct Income
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

        {/* Render Level Income table */}
        {activeIncomeTable === "levelIncome" && (
          <div>
            {transactions.map((transaction, index) =>
              transaction.type === "levelIncome" ? (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-2"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-400 rounded-full p-2 mr-4">
                      <ArrowDownIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Level Income
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-blue-500">
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
          <Sidebar  setIsSidebarOpen={setIsSidebarOpen}/>
          
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
                activeIncomeTable === "directIncome"
                  ? "bg-[#2a2a2a] text-white"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setActiveIncomeTable("directIncome")}
            >
              Direct Income
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                activeIncomeTable === "levelIncome"
                  ? "bg-[#2a2a2a] text-white"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setActiveIncomeTable("levelIncome")}
            >
              Level Income
            </button>
          </div>
          {renderIncomeContent()}
        </div>
      </div>
    </div>
  );
}