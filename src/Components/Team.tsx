import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Sidebar from "./sidebar.tsx";
import Header from "./header.tsx";
import { contractAddress } from "./Props/contractAddress.ts";
import { contractAbi } from "./Props/contractAbi.ts";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
// import { useWeb3Modal, useDisconnect } from '@web3modal/ethers5/react';

import Preloader from "./Preloader.tsx";
export default function TeamComponent() {
  // Use WalletContext
  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected, address } = useWeb3ModalAccount();
  const [loadingReferral, setLoadingReferral] = useState(true);
  const [loadingDownline, setLoadingDownline] = useState(true);
  //  const [provider, setProvider] = useState<null | ethers.providers.Web3Provider>(null);
  // const [signer, setSigner] = useState<null | ethers.Signer>(null);
  // const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("referral");
  const [referralData, setReferralData] = useState<TeamMember[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  interface TeamMember {
    user: string;
    level: number;
    rank: number;
    staking: string;
  }

  const [downlineData, setDownlineData] = useState<TeamMember[]>([]);
  const [walletAddress, setWalletAddress] = useState("");
  // const [loading, setLoading] = useState(true);
  const rankLabels = ["Starter", "Bronze", "Silver", "Gold", "Diamond"];

  // const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const paginateData = (data: TeamMember[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const nextPage = () => {
    if (activeTab === "referral") {
      setCurrentPage((prev) => {
        const maxPage = Math.ceil(referralData.length / itemsPerPage);
        return prev < maxPage ? prev + 1 : prev;
      });
    } else {
      setCurrentPage((prev) => {
        const maxPage = Math.ceil(downlineData.length / itemsPerPage);
        return prev < maxPage ? prev + 1 : prev;
      });
    }
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

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

      if (downlineData.length === 0) {
        fetchData(newContract);
      }
      if (referralData.length === 0) {
        fetchData2(newContract);
      }
    }
  }, [walletProvider]);
  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when data changes.
  }, [referralData, downlineData, activeTab]);
  const getUserAddresses = async (
    contract: ethers.Contract,
    address: string,
    k: number,
    retries = 3 // Maximum number of retries
  ): Promise<string[]> => {
    if (!address || typeof address !== "string") {
      throw new Error("Invalid address");
    }

    if (typeof k !== "number") {
      throw new Error("Invalid value for k");
    }

    while (retries > 0) {
      try {
        console.log(
          `Fetching user addresses for level ${k + 1}, retries left: ${retries}`
        );
        const userAddresses = await contract.getTmUsrLvlYc(address, k);
        console.log(
          `Successfully fetched ${userAddresses.length} addresses for level ${
            k + 1
          }.`
        );
        return userAddresses; // Return addresses if fetch is successful
      } catch (error) {
        retries--;
        console.error(
          `Error fetching user addresses for level ${k + 1}:`,
          error
        );

        if (retries > 0) {
          console.log(
            `Retrying fetching user addresses for level ${
              k + 1
            }, attempts remaining: ${retries}`
          );
          await sleep(800); // Wait for 5 seconds before retrying
        } else {
          console.error(
            `Failed to fetch user addresses for level ${
              k + 1
            } after multiple attempts.`
          );
          return []; // Return an empty array to prevent breaking the loop
        }
      }
    }

    return []; // Return an empty array if all retries fail
  };

  const fetchData = async (contract: ethers.Contract) => {
    if (isConnected && contract != null && address) {
      setLoadingDownline(true);
      try {
        console.log("Fetching data...");
        const maxLevels = 12;
        const userAddressesPerLevel: Record<number, string[]> = {};
        const totalTeam: any[] = [];
        const uniqueDownlineAddresses = new Set<string>();
        const processedLevels = new Set<number>();

        // Step 1: Fetch user addresses for all levels.
        for (let level = 0; level < maxLevels; level++) {
          const userAddresses = await fetchUserAddressesForLevel(
            contract,
            level
          );
          userAddressesPerLevel[level] = userAddresses;

          if (userAddresses.length > 0) {
            processedLevels.add(level);
          } else {
            console.log(`Level ${level + 1}: No users found.`);
            break; // Stop the loop if a level has zero users.
          }

          // Wait for a moment before proceeding to the next level.
          await sleep(800); // Adjust the delay as necessary.
        }

        // Step 2: Fetch detailed user data for all gathered addresses.
        for (const [level, userAddresses] of Object.entries(
          userAddressesPerLevel
        )) {
          await fetchUserDetails(
            contract,
            parseInt(level),
            userAddresses,
            totalTeam,
            uniqueDownlineAddresses
          );

          // Update state after processing each level's details.
          setDownlineData([...totalTeam]);

          // Wait before moving to the next set of user data to avoid overloading.
          await sleep(1000); // Adjust delay as necessary.
        }

        // Log any levels that were not successfully processed.
        const unprocessedLevels = [...Array(maxLevels).keys()].filter(
          (l) => !processedLevels.has(l)
        );
        if (unprocessedLevels.length > 0) {
          console.warn(
            `The following levels were not processed successfully: ${unprocessedLevels.join(
              ", "
            )}`
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingDownline(false); // Set loading to false after fetching.
      }
    }
  };

  // Step 1: Fetch user addresses for a specific level.
  const fetchUserAddressesForLevel = async (
    contract: ethers.Contract,
    level: number
  ): Promise<string[]> => {
    try {
      console.log(`Fetching user addresses for level ${level + 1}...`);
      if (address) {
        return await getUserAddresses(contract, address, level);
      } else {
        throw new Error("Address is undefined");
      }
    } catch (error) {
      console.error(`Error fetching addresses for level ${level + 1}:`, error);
      return [];
    }
  };

  // Step 2: Fetch user details in batches.
  const fetchUserDetails = async (
    contract: ethers.Contract,
    level: number,
    userAddresses: string[],
    totalTeam: any[],
    uniqueDownlineAddresses: Set<string>,
    batchSize = 5 // Adjust the batch size as necessary.
  ) => {
    console.log(`Fetching user details for level ${level + 1}...`);
    for (let i = 0; i < userAddresses.length; i += batchSize) {
      const batch = userAddresses.slice(i, i + batchSize);

      const stakePromises = batch.map(async (user: string) => {
        if (!uniqueDownlineAddresses.has(user)) {
          uniqueDownlineAddresses.add(user);
          const userD = await contract.users(user);
          const userD2 = await contract.users2(user);
          const st = ethers.utils.formatUnits(userD?.totStk, 6);
          const rk = userD2?.rk;
          return { user, level: level + 1, rank: rk, staking: st };
        }
      });

      const stakes = await Promise.all(stakePromises);
      const filteredStakes = stakes.filter(Boolean);
      totalTeam.push(...filteredStakes);

      console.log(
        `Level ${level + 1}: Processed batch of ${batch.length} users.`
      );
      await sleep(800); // Introduce a delay between batches if necessary.
    }
  };

  // Helper function to introduce a delay.
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const fetchData2 = async (contract: ethers.Contract) => {
    if (isConnected && contract != null) {
      // Fetching only if address is available
      setLoadingReferral(true);
      try {
        console.log("Fetching data...");

        const totalTeam = [];
        const uniqueDownlineAddresses = new Set();

        const userAddresses = await contract.getTmUsrLvlYc(address, 0);

        if (userAddresses) {
          const stakePromises = userAddresses.map(async (user: string) => {
            if (!uniqueDownlineAddresses.has(user)) {
              uniqueDownlineAddresses.add(user);
              const userD = await contract.users(user);
              console.log("userD", userD);
              const userD2 = await contract.users2(user);
              const st = ethers.utils.formatUnits(userD?.totStk, 6);
              const rk = userD2?.rk;
              return { user, level: 1, rank: rk, staking: st };
            }
          });
          const stakes = await Promise.all(stakePromises);
          totalTeam.push(...stakes.filter(Boolean));
        }
        setReferralData(totalTeam);

        // Fetch referral data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingReferral(false); // Set loading to false after fetching
      }
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const totalPages =
    activeTab === "referral"
      ? Math.ceil(referralData.length / itemsPerPage)
      : Math.ceil(downlineData.length / itemsPerPage);

  return (
    <div className="flex h-screen relative text-gray-900 dark:text-slate-300">
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

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          // toggleSidebar={toggleSidebar}
          walletAddress={walletAddress}
          setWalletAddress={setWalletAddress}
          showWalletAddress={true}
        />
        {/* <div className="flex justify-center mt-4">
          {walletAddress ? (
            <>
              <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={disconnectWallet}>
                Disconnect Wallet
              </button>
            </>
          ) : (
            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </div>
        <div className="flex justify-center mt-2 mb-2 px-6">
          <span className="text-gray-700 dark:text-gray-300">
            {walletAddress ? formatAddress(walletAddress) : ''}
          </span>
        </div> */}

        {/* Main content area */}
        <main className="min-h-screen bg-transparent mt-4">
          <div className="ml-6 mr-6 mx-auto team overflow-hidden">
            <div className="flex border-b border-blue-300">
              <button
                className={`flex-1 py-3 px-4 text-center ${
                  activeTab === "referral"
                    ? "bg-blue-300 text-gray-600 font-semibold"
                    : "bg-blue-100 text-gray-500"
                } hover:font-semibold`} // Add border to the right and remove for the last button
                onClick={() => setActiveTab("referral")}
              >
                <h2>
                  <strong>My Directs</strong>
                </h2>
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center ${
                  activeTab === "downline"
                    ? "bg-blue-300 text-gray-600 font-semibold"
                    : "bg-blue-100 text-gray-500"
                } hover:font-semibold`}
                onClick={() => setActiveTab("downline")}
              >
                <h2>
                  <strong>Total Team</strong>
                </h2>
              </button>
            </div>

            <div className="p-4 flex items-center justify-center bg-blue-100">
              <div className="overflow-x-auto">
                <table className="min-w-[350px] w-full table-fixed">
                  <thead>
                    <tr className="border-b border-blue-300 ">
                      <th className="text-center py-2 ">
                        <strong>User</strong>
                      </th>
                      <th className="text-center py-2 ">
                        <strong>Level</strong>
                      </th>
                      <th className="text-center py-2 ">
                        <strong>Rank</strong>
                      </th>
                      <th className="text-center py-2 ">
                        <strong>Staking</strong>
                      </th>
                      {/* <th className="text-center py-2 text-gray-200">Team Bussiness</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {activeTab === "referral" ? (
                      loadingReferral ? (
                        <tr>
                          {/* <td colSpan={4} className="py-4 text-center">
                            <Preloader />
                          </td> */}
                        </tr>
                      ) : (
                        paginateData(referralData).map((item, index) => (
                          <tr
                            key={index}
                            className="border-b border-blue-300 hover:font-semibold hover:text-green-400 text-gray-200"
                          >
                            <td className="py-2 text-center ">
                              {formatAddress(item.user)}
                            </td>
                            <td className="py-2 text-center">{item.level}</td>
                            <td className="py-2 text-center">
                              {rankLabels[item.rank]}
                            </td>
                            <td className="py-2 text-center">{item.staking}</td>
                          </tr>
                        ))
                      )
                    ) : loadingDownline ? (
                      <tr>
                        {/* <td colSpan={4} className="py-4 text-center ">
                          <Preloader />
                        </td> */}
                      </tr>
                    ) : (
                      paginateData(downlineData).map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-blue-300 hover:font-semibold hover:text-green-400 text-gray-200"
                        >
                          <td className="py-2 text-center">
                            {formatAddress(item.user)}
                          </td>
                          <td className="py-2 text-center">{item.level}</td>
                          <td className="py-2 text-center">
                            {rankLabels[item.rank]}
                          </td>
                          <td className="py-2 text-center">{item.staking}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-center p-4 bg-blue-100">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="p-2 rounded-full border border-blue-500 disabled:opacity-50"
              >
                <ArrowLeft className="w-6 h-6 text-blue-500" />
              </button>
              <span className="px-4 py-2 text-blue-500">
                {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage * itemsPerPage >=
                  (activeTab === "referral"
                    ? referralData.length
                    : downlineData.length)
                }
                className="p-2 rounded-full border border-blue-500 disabled:opacity-50"
              >
                <ArrowRight className="w-6 h-6 text-blue-500" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
