import { useEffect, useState } from "react";
import Sidebar from "./sidebar.tsx";
import Header from "./header.tsx";
import { ethers } from "ethers";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import { contractAbi } from "./Props/contractAbi.ts";
import { contractAddress } from "./Props/contractAddress.ts";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
// import { useWeb3Modal, useDisconnect } from '@web3modal/ethers5/react';
import Preloader from "./Preloader.js"; // Import the Preloader component

export default function Stake() {
  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected, address } = useWeb3ModalAccount();
  //  const [provider, setProvider] = useState<null | ethers.providers.Web3Provider>(null);
  // const [signer, setSigner] = useState<null | ethers.Signer>(null);
  // const [contract, setContract] = useState<ethers.Contract | null>(null);
  // const [rewardData, setRewardData] = useState(null);
  // const [userData, setUserData] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isRegistered, setIsRegistered] = useState(false);
  interface StakeTransaction {
    type: string;
    date: string;
    amount: string;
  }

  const [stakeData, setStakeData] = useState<{
    transactions: StakeTransaction[];
  }>({ transactions: [] });
  // const [stakeCount, setStakeCount] = useState(0);
  const [activeStakeTable, setActiveStakeTable] = useState("stake");
  const [loading, setLoading] = useState(true);

  // const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  // const navigate = useNavigate();

  useEffect(() => {
    if (walletProvider) {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      // setProvider(provider);
      const signer = provider.getSigner();
      // setSigner(signer);
      const newContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      // setContract(newContract);
      fetchData(newContract);
    }
  }, [walletProvider]);

  const fetchData = async (contract: ethers.Contract) => {
    console.log("fetching data");
    console.log("isConnected", isConnected, address, contract);
    if (isConnected && address && contract) {
      try {
        // setIsLoading(true);
        const userExists = await contract.isUserExists(address);
        // setIsRegistered(userExists);
        // const userDetails = await contract.users(address);
        // setUserData(userDetails);

        const rewardDetails = await contract.rewardInfo(address);
        console.log("reward data ---", rewardDetails);
        // setRewardData(rewardDetails);

        if (userExists) {
          const stakeCount = await contract.getUsrStkCnt(address);
          // setStakeCount(stakeCount);

          let stakeDataArray = [];

          // Fetch staking transactions
          const sti = await contract.getStkTx(address);
          if (sti && sti.length) {
            for (
              let i = 0;
              i < Math.min(stakeCount.toNumber(), sti.length);
              i++
            ) {
              const stake = sti[i];
              const stakedAmountBN = stake[0];
              const stakedAmount = parseFloat(
                ethers.utils.formatUnits(stakedAmountBN, 6)
              ).toFixed(2);
              const timestampBN = stake[1];
              const timestamp = timestampBN.toNumber() * 1000;
              const stakeDate = new Date(timestamp).toLocaleString();

              const stakeItem = {
                type: "staked",
                date: stakeDate,
                amount: stakedAmount,
              };

              stakeDataArray.push(stakeItem);
            }
          }

          // Fetch withdrawn transactions
          const wsti = await contract.getStkWTx(address);
          if (wsti && wsti.length) {
            for (let i = 0; i < wsti.length; i++) {
              const wstake = wsti[i];
              const wstakedAmountBN = wstake[0];
              const wstakedAmount = parseFloat(
                ethers.utils.formatUnits(wstakedAmountBN, 6)
              ).toFixed(2);
              const timestampBN = wstake[1];
              const timestamp = timestampBN.toNumber() * 1000;
              const wstakeDate = new Date(timestamp).toLocaleString();

              const stakeItem = {
                type: "wstaked",
                date: wstakeDate,
                amount: wstakedAmount,
              };

              stakeDataArray.push(stakeItem);
            }
          }

          // Fetch level withdrawals
          const wti = await contract.getLvlWTx(address);
          if (wti && wti.length) {
            for (let i = 0; i < wti.length; i++) {
              const wlev = wti[i];
              const wAmountBN = wlev[0];
              const wAmount = parseFloat(
                ethers.utils.formatUnits(wAmountBN, 6)
              ).toFixed(2);
              const timestampBN = wlev[1];
              const timestamp = timestampBN.toNumber() * 1000;
              const wDate = new Date(timestamp).toLocaleString();

              const stakeItem = {
                type: "wlevel",
                date: wDate,
                amount: wAmount,
              };

              stakeDataArray.push(stakeItem);
            }
          }

          // Fetch affiliate staking transactions
          const ati = await contract.getLvlTx(address);
          if (ati && ati.length) {
            for (let i = 0; i < ati.length; i++) {
              const level = ati[i];
              const leveldAmountBN = level[0];
              const leveldAmount = parseFloat(
                ethers.utils.formatUnits(leveldAmountBN, 6)
              ).toFixed(2);
              const timestampBN = level[1];
              const timestamp = timestampBN.toNumber() * 1000;
              const levelDate = new Date(timestamp).toLocaleString();

              const stakeItem = {
                type: "affiliateStaked",
                date: levelDate,
                amount: leveldAmount,
              };

              stakeDataArray.push(stakeItem);
            }
          }

          setStakeData({ transactions: stakeDataArray });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setIsLoading(false);
        setLoading(false);
      }
    }
  };

  const renderStakeContent = () => {
    return (
      <div className="p-4">
        {activeStakeTable === "stake" && (
          <div>
            {stakeData.transactions.length > 0 ? (
              stakeData.transactions.map((transaction, index) => {
                return transaction.type === "staked" ? (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-black p-4 rounded-lg shadow-sm mb-2"
                  >
                    <div className="flex items-center">
                      <div className="bg-transparent border border-yellow-300 hover:border-black hover:bg-yellow-300 rounded-full p-2 mr-4">
                        <ArrowUpIcon className="h-6 w-6 text-white hover:text-black" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-200">Staked</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-yellow-300">
                      ${transaction.amount}
                    </p>
                  </div>
                ) : transaction.type === "wstaked" ? (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-black p-4 rounded-lg shadow-sm mb-2"
                  >
                    <div className="flex items-center">
                      <div className="bg-transparent border border-green-300 hover:border-black hover:bg-green-300 rounded-full p-2 mr-4">
                        <ArrowDownIcon className="h-6 w-6 text-white hover:text-black" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-200">Withdrawn</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-green-500">
                      ${transaction.amount}
                    </p>
                  </div>
                ) : null;
              })
            ) : (
              <p className="text-gray-600">No staking transactions found.</p>
            )}
          </div>
        )}

        {activeStakeTable === "affiliateStaked" && (
          <div>
            {stakeData.transactions.length > 0 ? (
              stakeData.transactions.map((transaction, index) => {
                if (transaction.type === "affiliateStaked") {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-black p-4 rounded-lg shadow-sm mb-2"
                    >
                      <div className="flex items-center">
                        <div className="bg-transparent border border-yellow-300 hover:border-black hover:bg-yellow-300 rounded-full p-2 mr-4">
                          <ArrowUpIcon className="h-6 w-6 text-white hover:text-black" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-200">
                            Affiliate Staked
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-yellow-400">
                        ${transaction.amount}
                      </p>
                    </div>
                  );
                } else if (transaction.type === "wlevel") {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-black p-4 rounded-lg shadow-sm mb-2"
                    >
                      <div className="flex items-center">
                        <div className="bg-transparent border border-green-300 hover:border-black hover:bg-green-300 rounded-full p-2 mr-4">
                          <ArrowDownIcon className="h-6 w-6 text-white hover:text-black" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-200">
                            Withdrawn
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
                  );
                } else {
                  return null;
                }
              })
            ) : (
              <p className=" text-gray-600">
                No affiliate staking transactions found.
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen relative dark:bg-gray-900 text-gray-900 dark:text-slate-300">
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

      <div className="flex-1 overflow-auto dark:bg-gray-900 dark:text-slate-300">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          walletAddress={address || ""}
          setWalletAddress={() => {}}
          showWalletAddress={true}
        />
        {/* {loading ? ( // Render the preloader if loading
          <Preloader />
        ) : ( */}
        <main className="min-h-screen bg-transparent mt-4">
          <div className="ml-6 mr-6 min-w-screen stake mx-auto bg-blue-100 rounded-3xl shadow-md overflow-hidden mt-6 border-blue-300 ">
            <div className="flex border-b border-blue-300">
              {["stake", "affiliateStaked"].map((tab, index) => (
                <button
                  key={tab}
                  className={`flex-1 py-3 px-4 text-center hover:font-normal ${
                    activeStakeTable === tab
                      ? "bg-blue-300 text-gray-900"
                      : "bg-blue-100 text-gray-800"
                  } ${index < 1 ? "border-blue-300" : ""}`}
                  onClick={() => setActiveStakeTable(tab)}
                >
                  <strong>
                    {tab === "stake" ? "Stake" : "Affiliate Staked"}
                  </strong>
                </button>
              ))}
            </div>

            <div>{renderStakeContent()}</div>
          </div>
        </main>
        {/* )} */}
      </div>
    </div>
  );
}
