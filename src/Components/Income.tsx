import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Sidebar from "./sidebar.tsx";
import Header from "./header.tsx";
import { ArrowDownIcon } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import { contractAbi } from "./Props/contractAbi.ts";
import Preloader from "./Preloader.tsx"; // Import the Preloader component
import { contractAddress } from "./Props/contractAddress.ts";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
// import { useWeb3Modal, useDisconnect } from '@web3modal/ethers5/react';
export default function Income() {
  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected, address } = useWeb3ModalAccount();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeIncomeTable, setActiveIncomeTable] = useState("directIncome");

  interface IncomeTransaction {
    type: string;
    date: string;
    amount: string;
  }

  const [directIncomeData, setDirectIncomeData] = useState<{
    transactions: IncomeTransaction[];
  }>({ transactions: [] });

  const [levelIncomeData, setLevelIncomeData] = useState<{
    transactions: IncomeTransaction[];
  }>({ transactions: [] });

  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchContractData = () => {
      if (walletProvider) {
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const signer = provider.getSigner();
        const newContract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        fetchDirectIncomeData(newContract);
        fetchLevelIncomeData(newContract);
      }
    };
    fetchContractData();
  }, [walletProvider]);

  const fetchDirectIncomeData = async (contract: ethers.Contract | null) => {
    if (isConnected && contract) {
      try {
        const userExists = await contract.isUserExists(address);
        if (userExists) {
          const directTransactions = await contract.getDirTx(address);
          const directIncomeDataArray = directTransactions.map(
            (directIncome: [ethers.BigNumber, ethers.BigNumber]) => {
              const directIncomeAmount = parseFloat(
                ethers.utils.formatUnits(directIncome[0], 6)
              ).toFixed(2);
              const timestamp = new Date(
                directIncome[1].toNumber() * 1000
              ).toLocaleString();

              return {
                type: "directIncome",
                date: timestamp,
                amount: directIncomeAmount,
              };
            }
          );
          setDirectIncomeData({ transactions: directIncomeDataArray });
        }
      } catch (error) {
        console.error("Error fetching direct income data:", error);
      }
    }
  };

  const fetchLevelIncomeData = async (contract: ethers.Contract | null) => {
    if (isConnected && contract) {
      try {
        const userExists = await contract.isUserExists(address);
        if (userExists) {
          const levelTransactions = await contract.getLevelTx(address);
          const levelIncomeDataArray = levelTransactions.map(
            (levelIncome: [ethers.BigNumber, ethers.BigNumber]) => {
              const levelIncomeAmount = parseFloat(
                ethers.utils.formatUnits(levelIncome[0], 6)
              ).toFixed(2);
              const timestamp = new Date(
                levelIncome[1].toNumber() * 1000
              ).toLocaleString();

              return {
                type: "levelIncome",
                date: timestamp,
                amount: levelIncomeAmount,
              };
            }
          );
          setLevelIncomeData({ transactions: levelIncomeDataArray });
        }
      } catch (error) {
        console.error("Error fetching level income data:", error);
      }
    }
  };

  const renderDirectIncomeContent = () => {
    return (
      <div className="p-4">
        {directIncomeData.transactions.length > 0 ? (
          directIncomeData.transactions.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-black p-4 rounded-lg shadow-sm mb-2"
            >
              <div className="flex items-center">
                <div className="bg-transparent border border-green-400 hover:border-black hover:bg-green-400 rounded-full p-2 mr-4">
                  <ArrowDownIcon className="h-6 w-6 text-white hover:text-black" />
                </div>
                <div>
                  <p className="font-semibold text-green-400">Direct Income</p>
                  <p className="text-sm text-gray-200">{transaction.date}</p>
                </div>
              </div>
              <p className="font-semibold text-green-500">
                ${parseFloat(transaction.amount).toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No direct income transactions found.</p>
        )}
      </div>
    );
  };

  const renderLevelIncomeContent = () => {
    return (
      <div className="p-4">
        {levelIncomeData.transactions.length > 0 ? (
          levelIncomeData.transactions.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-black p-4 rounded-lg shadow-sm mb-2"
            >
              <div className="flex items-center">
                <div className="bg-transparent border border-blue-400 hover:border-black hover:bg-blue-400 rounded-full p-2 mr-4">
                  <ArrowDownIcon className="h-6 w-6 text-white hover:text-black" />
                </div>
                <div>
                  <p className="font-semibold text-blue-400">Level Income</p>
                  <p className="text-sm text-gray-200">{transaction.date}</p>
                </div>
              </div>
              <p className="font-semibold text-blue-500">
                ${parseFloat(transaction.amount).toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No level income transactions found.</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen relative dark:text-slate-300">
      {/* Background Text */}
      <div
        className=" bg-blue-300 absolute top-0 left-0 w-full h-full flex items-center justify-center text-9xl font-light text-blue-900 opacity-20"
        style={{
          zIndex: -1,
        }}
      >
        <div className="h2 overflow-hidden">USDX</div>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-white dark:bg-gray-900 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        <div className="hidden lg:block w-64 bg-white shadow-lg md:hidden">
          <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          walletAddress={address || ""}
          setWalletAddress={() => {}}
          showWalletAddress={true}
        />
        {/* Show Preloader while loading */}
        {/* {loading ? (
          <Preloader />
        ) : ( */}
        <div className="ml-6 mr-6 mx-auto income text-gray-600 rounded-2xl shadow-2xl overflow-hidden mt-6">
          <div className="flex">
            <button
              className={`flex-1 py-3 px-4 text-center hover:font-normal ${
                activeIncomeTable === "directIncome"
                  ? "bg-blue-300 text-black"
                  : "bg-blue-100"
              } border-b border-blue-300`}
              onClick={() => setActiveIncomeTable("directIncome")}
            >
              <strong>Direct Income</strong>
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center hover:font-normal ${
                activeIncomeTable === "levelIncome"
                  ? "bg-blue-300 text-black"
                  : "bg-blue-100"
              } border-b border-blue-300`}
              onClick={() => setActiveIncomeTable("levelIncome")}
            >
              <strong>Level Income</strong>
            </button>
          </div>
          <div>
            {activeIncomeTable === "directIncome" &&
              renderDirectIncomeContent()}
            {activeIncomeTable === "levelIncome" && renderLevelIncomeContent()}
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}
