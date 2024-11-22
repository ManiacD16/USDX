import { useState, useEffect } from "react";
import { contractAbi } from "./Props/contractAbi.ts";
import { ethers } from "ethers";
// import Preloader from './Preloader.tsx';
import {
  UserIcon,
  DollarSign,
  GitBranchPlus,
  HandCoins,
  PiggyBank,
  Vault,
  Currency,
  Crown,
  Wallet,
  BellMinus,
} from "lucide-react";
import Sidebar from "./sidebar.tsx";
import Header from "./header.tsx";

import "../App.css";
import { useNavigate } from "react-router-dom";
import { contractAddress } from "./Props/contractAddress.ts";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
// import { useWeb3Modal, useDisconnect } from '@web3modal/ethers5/react';

const EcommerceReferralPage = () => {
  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected, address } = useWeb3ModalAccount();
  const [investmentTotal, setInvestmentTotal] = useState(5000); // Dummy investment totaly
  const [dailyROI, setDailyROI] = useState(100); // Dummy daily ROI
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [balance, setBalance] = useState(2000); // Dummy balance
  const [yieldbalance, setyieldBalance] = useState(300); // Dummy yield balance
  const [rankReward, setRankReward] = useState(150); // Dummy rank reward
  const [withdrawType, setWithdrawType] = useState("invest_withdraw"); // Default type
  const [loading, setLoading] = useState<boolean>(false);
  //  const [provider, setProvider] = useState<null | ethers.providers.Web3Provider>(null);
  // const [signer, setSigner] = useState<null | ethers.Signer>(null);
  // Use WalletContext
  const yieldPackages = [
    { name: "BASIC", investment: 950, yield: 1000 },
    { name: "STANDARD", investment: 4500, yield: 5000 },
    { name: "PREMIUM", investment: 8500, yield: 10000 },
    { name: "ROYAL", investment: 20000, yield: 25000 },
  ];

  const [airdropClaim, setAirClaim] = useState<number | null>(null);
  // const [levelClaim,setLevelClaim] = useState(null);

  interface TeamData {
    [index: number]: number;
  }

  const [teamData, setTeamData] = useState<TeamData>([]);

  // const [isRegistered, setIsRegistered] = useState(false);
  // const [hasApproval, setHasApproval] = useState(false);
  // const [referralAddress, setReferralAddress] = useState('');
  // let stakeAmount: string | undefined;
  // const [weeklyTimestamp, setWeeklyTimestamp] = useState(0);//
  // const [monthlyTimestamp, setMonthlyTimestamp] = useState(0);//
  // const [weeklyTimeLeft, setWeeklyTimeLeft] = useState(0);
  // const [monthlyTimeLeft, setMonthlyTimeLeft] = useState(0);
  // const [minStake, setMinStake] = useState(0);
  // const [maxStake, setMaxStake] = useState(0);
  // const [roiPerDay, setRoiPerDay] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  interface UserData {
    totStk: ethers.BigNumber;
    dirBus: ethers.BigNumber;
    tmBus: ethers.BigNumber;
    prtCnt: ethers.BigNumber;
    aStk: {
      amt: ethers.BigNumber;
    };
    // Add other properties if needed
  }

  const [userData, setUserData] = useState<UserData | null>(null);
  interface UserData2 {
    adrp: string[];
    aStk: {
      amt: ethers.BigNumber;
    };
    // Add other properties if needed
  }

  const [userData2, setUserData2] = useState<UserData2 | null>(null);
  interface RewardData {
    avlStkRwds: string;
    avlLvlRwds: string;
    dirRwds: string;
    wtdRwds: string;
    lvlRwds: string; // Add this line
  }

  const [rewardData, setRewardData] = useState<RewardData | null>(null);
  const userAddress: string | undefined = undefined;
  const [remainingLimit, setRemainingLimit] = useState(0);
  // const [directIncome,setDirectIncome] = useState(0);
  // const [remaininglevelRewards, setremaininglevelRewards] = useState(0);
  // const [error, setError] = useState(null);
  const [weeklyBusiness, setWeeklyBusiness] = useState(0);
  const [monthlyBusiness, setMonthlyBusiness] = useState(0);
  const [WAchievers, setWAchievers] = useState(0);
  const [MAchievers, setMAchievers] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  // const [weeklyResetTime, setWeeklyResetTime] = useState<string>("");
  // const [monthlyResetTime, setMonthlyResetTime] = useState<string>("");
  // const [weeklyResetTimeUTC, setWeeklyResetTimeUTC] = useState<string>("");
  // const [monthlyResetTimeUTC, setMonthlyResetTimeUTC] = useState<string>("");
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  // const [usdtContract, setUsdtContract] = useState<ethers.Contract | null>(null);
  // const usdtAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT token address on BSC Testnet
  //checkAllowance
  //handleStake
  //line 151 and 152
  const navigate = useNavigate();

  // USDT Contract ABI for approval and allowance check
  // const usdtAbi = [
  //   {
  //     "inputs": [
  //       { "internalType": "address", "name": "owner", "type": "address" },
  //       { "internalType": "address", "name": "spender", "type": "address" }
  //     ],
  //     "name": "allowance",
  //     "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       { "internalType": "address", "name": "spender", "type": "address" },
  //       { "internalType": "uint256", "name": "amount", "type": "uint256" }
  //     ],
  //     "name": "approve",
  //     "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }
  // ];

  // Connect wallet and initialize ethers provider and signer

  // Check if the user is registered

  useEffect(() => {
    const a = () => {
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
        setContract(newContract);
        // const usdt = new ethers.Contract(usdtAddress, usdtAbi, signer);
        // setUsdtContract(usdt);
      }
    };
    a();
  }, [walletProvider]);
  // Check if the user already has USDT approval
  //  const [weeklyBus, weeklyTs, monthlyBus, monthlyTs] = await newContract.getBussiness();
  // setWeeklyBusiness(weeklyBus.toString());
  // setMonthlyBusiness(monthlyBus.toString());
  // setWeeklyTimestamp(weeklyTs.toString());
  // setMonthlyTimestamp(monthlyTs.toString());
  // Set hasApproval state if sufficient allowance
  // Set hasApproval state if sufficient allowance
  //     } catch (error) {
  //       // console.error("Error connecting to wallet:", error);
  //       // alert("Error connecting to wallet. Please try again later.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   } else {
  //     // alert("Please install MetaMask to use this feature.");
  //     setIsLoading(false);
  //   }

  // };

  //   const checkAllowance = async (amount: string) => {
  //     try {
  //         // Ensure amount is valid
  //         if (amount === undefined || amount === null || isNaN(Number(amount))) {
  //             // console.error("Invalid amount:", amount);
  //             return; // Exit early if the amount is invalid
  //         }

  //         // Fetch the current allowance for the user's account and contract
  //         if (!usdtContract) {
  //             throw new Error("USDT contract is not initialized");
  //         }
  //         const allowance = await usdtContract.allowance(address, contractAddress);

  //         // Log the current allowance (in the contract's decimals, usually 18 for USDT)
  //         // console.log("Allowance:", ethers.utils.formatUnits(allowance, 18));

  //         // Parse the staking amount to match the token's decimals
  //         const approvalAmount = ethers.utils.parseUnits(amount.toString(), 18);
  //         console.log("Approval Amount:", ethers.utils.formatUnits(approvalAmount, 18));

  //         // Check if the allowance is sufficient for the staking amount
  //         const isApproved = allowance.gte(approvalAmount);
  //         // setHasApproval(isApproved); // Set the approval state

  //         console.log("Has Approval:", isApproved);
  //         return isApproved; // Return whether approval is sufficient
  //     } catch (error) {
  //         // console.error("Error checking allowance:", error);

  //         return false; // Return false if there's an error
  //     }
  // };

  const fetchRemainingLimit = async () => {
    if (!address || !contract) return;

    try {
      const remaining = await contract._calRem(address);
      // console.log('Remaining limit:', ethers.utils.formatUnits(remaining, 18), remaining);
      setRemainingLimit(remaining);
    } catch (error) {
      // console.error('Error fetching remaining limit:', error);
      // alert('Error fetching remaining limit. Please try again later.');
    }
  };
  const [airdropReward, setRewardAirdrop] = useState<number | null>(null);
  const [userDiv, setUserDiv] = useState(null);
  const [userLevDiv, setUserLevDiv] = useState(null);
  useEffect(() => {
    if (isConnected) {
      // Connect wallet
      if (address && contract) {
        const updateReward = async () => {
          // console.log("...>",address);
          const reward = await contract.getUsrAdrpDiv(address);
          if (
            Number(ethers.utils.formatUnits(userData2?.adrp[2] || "00", 18)) > 0
          ) {
            setRewardAirdrop(reward);
          } else {
            setRewardAirdrop(0);
          }

          // console.log("airdrop div ",reward);
          const ar = await contract.getUsrDiv(address);
          setUserDiv(ar);
          // console.log("user div ",ar);
          const lr = await contract.getUsrLvlDiv(address);
          setUserLevDiv(lr);
        };
        updateReward();
        fetch();

        fetchRemainingLimit();
      }
    }
  }, [address, contract]);
  // Update Reward

  // useEffect(() => {connectWallet();}, []);
  // Handle staking
  //   const handleStake = async () => {
  //   // Uncomment this section to validate stake amounts

  //   try {
  //     const stakeAmt = ethers.utils.parseUnits(amount, 18);

  //     console.log("Staking amount:", stakeAmt);
  //     const isApproved = await checkAllowance(stakeAmt.toString());

  //     // If the allowance is insufficient, request approval
  //     if (!isApproved) {
  //         console.log("Requesting approval...");
  //         if (!usdtContract) {
  //             throw new Error("USDT contract is not initialized");
  //         }
  //         const txApprove = await usdtContract.approve(contractAddress, ethers.constants.MaxUint256); // Max approval amount
  //         await txApprove.wait(); // Wait for the approval transaction to complete
  //         console.log("Approval successful!");
  //         // setHasApproval(true); // Set approval state after successful transaction
  //     }

  //     // Proceed to stake after approval
  //     console.log("Staking amount:", stakeAmt);
  //     if (contract) {
  //       const txStake = await contract.stake(stakeAmt);
  //       await txStake.wait();
  //       alert(`Successfully staked ${amount} USDT!`);
  //     } else {
  //       console.error("Contract is not initialized");
  //       alert("Contract is not initialized. Please try again later.");
  //     }

  //     // Refresh the page after successful staking
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Staking failed:", error);
  //     alert("Staking failed. Please try again.");
  //   }
  // };

  //
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [amount, setAmount] = useState("");
  // const [isActive, setIsActive] = useState(false);

  // const [adContentType, setAdContentType] = useState("image"); // "image" or "video"
  // const adContent = {
  //   image:
  //     "https://assets.staticimg.com/cms/media/40Pluo0RAbtdRMJKmYM5w3uzD7AgVxCGme7TFCnZC.png", // Replace with your image URL
  //   video: "https://example.com/ad-video.mp4", // Replace with your video URL
  // };

  const handleWithdraw = async () => {
    try {
      if (!contract) {
        console.error("Contract is not initialized");
        alert("Contract is not initialized. Please try again later.");
        return;
      }
      const txWithdraw = await contract.clmAdrp();
      await txWithdraw.wait();
      alert("Successfully withdrawn airdrop!");
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Withdrawal failed:", error);
      alert("Failed to withdraw airdrop. Please try again.");
    }
  };

  const handleWithdrawLevel = async () => {
    try {
      if (!contract) {
        console.error("Contract is not initialized");
        alert("Contract is not initialized. Please try again later.");
        return;
      }
      const txWithdraw = await contract.wdrLvl();
      await txWithdraw.wait();
      alert("Successfully withdrawn Level Reward!");
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Withdrawal failed:", error);
      alert("Failed to withdraw Level Reward. Please try again.");
    }
  };

  const handleWithdrawStake = async () => {
    try {
      if (!contract) {
        console.error("Contract is not initialized");
        alert("Contract is not initialized. Please try again later.");
        return;
      }
      const txWithdrawStake = await contract.wdrStk();
      await txWithdrawStake.wait();
      alert("Successfully withdrawn stake!");
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Withdrawal failed:", error);
      alert("Failed to withdraw stake. Please try again.");
    }
  };

  const [inviteLink, setInviteLink] = useState(
    `https://bullbtc.live/#/register?referral=undefined`
  );
  useEffect(() => {
    if (isConnected) {
      const a = async () => {
        if (address && contract) {
          const userDetails = await contract.users(address);
          // console.log(userDetails);
          setUserData(userDetails);
          const userDetails2 = await contract.users2(address);
          // console.log("ud2.............>",userDetails2);
          setUserData2(userDetails2);

          const rewardDetails = await contract.rewardInfo(address);
          // console.log("reward data ---",rewardDetails);
          setRewardData(rewardDetails);
          // console.log(address);
          const teamDetails = await contract.getTTeam(address);
          setTeamData(teamDetails);
          // const userExists = await contract.isUserExists(address);
          const business = await contract.getBus();
          // setWeeklyTimestamp(business[1].toNumber());
          // setMonthlyTimestamp(business[3].toNumber());
          const wCount = await contract.totElgUsrWkly();
          setWAchievers(wCount.toNumber());
          const mCount = await contract.totElgUsrMthly();
          setMAchievers(mCount.toNumber());
          // setIsRegistered(userExists);

          // Fetch staking limits and ROI
          // const fetchedMinStake = await contract.minStk();
          // const fetchedMaxStake = await contract.maxStk();
          // setMinStake(ethers.utils.formatUnits(fetchedMinStake, 18));
          // setMaxStake(ethers.utils.formatUnits(fetchedMaxStake, 18));
          setMonthlyBusiness(
            parseFloat(ethers.utils.formatUnits(business.mth_Bus, 18))
          );
          setWeeklyBusiness(
            parseFloat(ethers.utils.formatUnits(business.wk_Bus, 18))
          );
        }
      };
      a();

      if (address) {
        setInviteLink(`https://bullbtc.live/#/register?referral=${address}`);
      }
    }
  }, [address, contract]);

  useEffect(() => {
    // Show the popup after a short delay when the component mounts
    const timer = setTimeout(() => setShowPopup(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  // Use Sets to track unique addresses

  // Fetch downline data
  const fetch = async () => {
    if (contract) {
      await contract.getDirTx(address);
    }
    let val = 0;
    if (!contract) {
      console.error("Contract is not initialized");
      return;
    }
    const directTransactions = await contract.getDirTx(address);
    for (const directIncome of directTransactions) {
      const directIncomedAmount = parseFloat(
        ethers.utils.formatUnits(directIncome[0], 18)
      ).toFixed(2);
      // const timestamp = new Date(directIncome[1].toNumber() * 1000).toLocaleString();
      val += parseFloat(directIncomedAmount) * 0.05;
      // console.log("Direct Income:", val);
    }
    // setDirectIncome(val);

    const airdropTransactions = await contract.getArdTx(address);
    let valair = 0;
    for (const airClaim of airdropTransactions) {
      const airClaimdAmount = parseFloat(
        ethers.utils.formatUnits(airClaim[0], 18)
      ).toFixed(2);
      // const timestamp = new Date(airClaim[1].toNumber() * 1000).toLocaleString();
      valair += parseFloat(airClaimdAmount);
      // console.log("airdrop Income:",airClaim,"   valair", valair);
    }
    setAirClaim(valair);
  };

  useEffect(() => {
    if (isConnected) {
      const calculateRemainingLimit = async () => {
        try {
          if (contract) {
            const result = await contract._calRem(userAddress);
            setRemainingLimit(result);
            console.log(
              "Remaining limit:",
              ethers.utils.formatUnits(result, 18),
              result
            );
          } else {
            console.error("Contract is not initialized");
          }
        } catch (error) {
          console.error("Error fetching remaining limit:", error);
        }
      };

      calculateRemainingLimit();
    }
  }, [userAddress]);
  const availableAirdrop = (
    Number(ethers.utils.formatUnits(userData2?.adrp[0] || "00", 18)) -
    Number(ethers.utils.formatUnits(userData2?.adrp[3] || "00", 18)) +
    Number(ethers.utils.formatUnits(airdropReward || "00", 18)) -
    Number(airdropClaim)
  ).toFixed(2);
  // const handleUserAddressChange = (event) => {
  //   setUserAddress(event.target.value);
  // };
  // useEffect(() => {
  //   const updateTimers = () => {
  //     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds (UTC)

  //     // Use the blockchain timestamps and add 70 or 120 minutes (converted to seconds)
  //     const weeklyReset = weeklyTimestamp + 70 * 60; // Adding 70 minutes in seconds
  //     const monthlyReset = monthlyTimestamp + 120 * 60; // Adding 120 minutes in seconds

  //     const timeLeftWeekly = weeklyReset - currentTime;
  //     const timeLeftMonthly = monthlyReset - currentTime;

  //     // Update the state with formatted time or set to "0d 0h 0m 0s" if no time left
  //     setWeeklyTimeLeft(timeLeftWeekly > 0 ? formatTimeLeft(timeLeftWeekly) : "0d 0h 0m 0s");
  //     setMonthlyTimeLeft(timeLeftMonthly > 0 ? formatTimeLeft(timeLeftMonthly) : "0d 0h 0m 0s");
  //   };

  //   // Set interval to update every second
  //   const timer = setInterval(updateTimers, 1000);

  //   return () => clearInterval(timer); // Cleanup on component unmount
  // }, [weeklyTimestamp, monthlyTimestamp]); // Only re-run if these change

  // useEffect(() => {
  //   const updateResetTimes = () => {
  //     // Weekly and monthly timestamps are Unix timestamps from the blockchain
  //     const weeklyReset = weeklyTimestamp +  7 * 24 * 60 * 60; // Add 70 minutes in seconds
  //     const monthlyReset = monthlyTimestamp + 30 * 24 * 60 * 60; // Add 120 minutes in seconds

  //     // Convert the updated timestamps to human-readable date and time
  //     // setWeeklyResetTime(convertTimestampToDate(weeklyReset));
  //     // setMonthlyResetTime(convertTimestampToDate(monthlyReset));
  //     setWeeklyResetTimeUTC(convertTimestampToDateUTC(weeklyReset));
  //     setMonthlyResetTimeUTC(convertTimestampToDateUTC(monthlyReset));

  //   };

  //   updateResetTimes(); // Update immediately when component mounts

  //   return () => {}; // No need for cleanup as there's no interval
  // }, [weeklyTimestamp, monthlyTimestamp]); // Update if the timestamps change

  // const convertTimestampToDateUTC = (timestamp: number) => {
  //   const date = new Date(timestamp*1000);
  //   return date.toUTCString();
  // };

  // const convertTimestampToDate = (timestamp: number) => {
  //   // Convert from seconds (blockchain format) to milliseconds (JavaScript format)
  //   const date = new Date(timestamp * 1000);

  //   // Convert the date to IST using the 'Asia/Kolkata' timezone
  //   return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  // };
  // console.log("reward data ---",rewardData);
  // console.log("usrliv data ---",userLevDiv);

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

  const handleBuy = async (pkg: {
    name: any;
    investment: any;
    yield?: number;
  }) => {
    alert(`Successfully purchased ${pkg.name} package for $${pkg.investment}!`);
  };

  function invest() {
    throw new Error("Function not implemented.");
  }

  function withdraw() {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex h-screen relative text-gray-800 dark:bg-gray-900 dark:text-gray-200 ">
      {/* Background Text */}
      <div
        className=" bg-blue-300 absolute top-0 left-0 w-full h-full flex items-center justify-center text-9xl font-light text-blue-900 opacity-20"
        style={{
          zIndex: -1,
        }}
      >
        <div className="h2 overflow-hidden">USDX</div>
      </div>

      {/* Optional: Adding some overlay styling to ensure the 3D text is behind other content */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div> */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      <div className="flex h-screen">
        <div className="hidden lg:block w-64 bg-white shadow-lg md:hidden">
          <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          walletAddress={""}
          setWalletAddress={() => {}}
          showWalletAddress={false}
        />

        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-6 text-shadow">
            Referral Link
          </h2>
          <div className="flex items-center referral overflow-hidden mb-6">
            <div className="p-2 border-r border-gray-300 dark:bg-gray-700 bg-blue-300">
              <UserIcon className="h-6 w-6 text-gray-600" />
            </div>
            <input
              type="text"
              value={inviteLink}
              readOnly
              className="flex-grow min-w-0 px-3 py-2 text-sm focus:outline-none bg-transparent dark:bg-gray-800"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 button transition-colors duration-200"
            >
              COPY
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Daily Dividends Box */}
            <div className="p-6 card flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg md:text-2xl font-semibold">
                  Daily Yield
                </h2>
                <p className="md:text-lg text-2xl font-bold text-green-600">
                  $ $
                  {(
                    Number(
                      ethers.utils.formatUnits(userData2?.adrp[2] || "00", 18)
                    ) -
                    Number(ethers.utils.formatUnits(airdropReward || "00", 18))
                  ).toFixed(2) || "0"}
                </p>
              </div>
              <DollarSign className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
            </div>

            {/* Level Income Box */}
            <div className="p-6 card flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg md:text-2xl font-semibold">
                  Level Income
                </h2>
                <p className="md:text-lg text-2xl font-bold text-green-600">
                  $ $
                  {(
                    Number(
                      ethers.utils.formatUnits(
                        rewardData?.wtdRwds?.toString() || "00",
                        18
                      )
                    ) +
                    Number(
                      ethers.utils.formatUnits(
                        rewardData?.dirRwds.toString() || "00",
                        18
                      )
                    )
                  ).toFixed(2) || "0"}
                </p>
              </div>
              <GitBranchPlus className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
            </div>

            {/* Rank Rewards Box */}
            <div className="p-6 card flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg md:text-2xl font-semibold">
                  Rank Rewards
                </h2>
                <p className="md:text-lg text-2xl font-bold text-green-600">
                  ${(monthlyBusiness * 5) / 100}
                </p>
              </div>
              <Crown className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
            </div>

            {/* Total Deposit Box */}
            <div className="p-6 card flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg md:text-2xl font-semibold">
                  Total Deposit
                </h2>
                <p className="md:text-lg text-2xl font-bold text-green-600">
                  $ $
                  {ethers.utils.formatUnits(
                    userData?.totStk?.toString() || "00",
                    18
                  ) || "0"}
                </p>
              </div>
              <Vault className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
            </div>

            {/* Total Income Box */}
            <div className="p-6 card flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg md:text-2xl font-semibold">
                  Total Income
                </h2>
                <p className="md:text-lg text-2xl font-bold text-green-600">
                  $ $
                  {(
                    Number(
                      ethers.utils.formatUnits(
                        rewardData?.wtdRwds?.toString() || "00",
                        18
                      )
                    ) +
                    Number(
                      ethers.utils.formatUnits(
                        rewardData?.dirRwds.toString() || "00",
                        18
                      )
                    )
                  ).toFixed(2) || "0"}
                </p>
              </div>
              <Wallet className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
            </div>

            {/* Balance Box */}
            <div className="p-6 card flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg md:text-2xl font-semibold">Balance</h2>
                <p className="md:text-lg text-2xl font-bold text-green-600">
                  $ $
                  {(
                    Number(
                      ethers.utils.formatUnits(
                        rewardData?.avlStkRwds || "0",
                        18
                      )
                    ) + Number(ethers.utils.formatUnits(userDiv || "0", 18))
                  ).toFixed(2) || "0"}
                </p>
              </div>
              <Currency className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
            </div>

            {/* Yield Balance Box */}
            <div className="p-6 card flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg md:text-2xl font-semibold">
                  Yield Balance
                </h2>
                <p className="md:text-lg text-2xl font-bold text-green-600">
                  ${yieldbalance}
                </p>
              </div>
              <BellMinus className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
            </div>

            {/* Deposit Box */}
            <div className="p-6 card flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg md:text-2xl font-semibold">
                    Deposit{" "}
                    <span className="ml-0 md:ml-4 mb-2 text-sm text-gray-600 dark:text-gray-300">
                      Minimum: $100 | Maximum: $25,000
                    </span>
                  </h2>
                  <PiggyBank className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
                </div>
                <div className="flex flex-col mt-4 mb-2 md:flex-row">
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Enter amount to deposit"
                    className=" card  p-2 rounded-xl w-full md:w-1/2 mr-0 md:mr-2 shadow-xl text-gray-600"
                  />
                  <button
                    onClick={invest}
                    className="button mt-2 md:mt-0 px-4 py-2 w-full md:w-1/2 bg-green-600 text-white rounded-xl shadow-xl hover:bg-green-700"
                  >
                    Deposit
                  </button>
                </div>
              </div>
            </div>

            {/* Withdraw Box */}
            <div className="p-6 card flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg md:text-2xl font-semibold">
                    Withdraw
                  </h2>
                  <HandCoins className="w-6 h-6 md:w-8 md:h-8 icon font-bold" />
                </div>

                <div className="flex flex-col mt-4 mb-2 md:flex-row">
                  {/* Dropdown for withdrawal type */}
                  <select
                    value={withdrawType}
                    onChange={(e) => setWithdrawType(e.target.value)}
                    className="border card p-2 rounded-xl w-full md:w-1/2 mr-0 md:mr-2 shadow-xl"
                  >
                    <option value="invest_withdraw">Invest Withdraw</option>
                    <option value="yield_withdraw">Yield Withdraw</option>
                  </select>

                  {/* Input field for withdrawal amount */}
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Enter amount to withdraw"
                    className="card p-2 rounded-xl w-full md:w-1/2 mr-0 md:mr-2 shadow-xl mt-2 md:mt-0"
                  />

                  {/* Withdraw button */}
                  <button
                    onClick={withdraw}
                    className=" button mt-2 md:mt-0 px-4 py-2 w-full md:w-1/2 bg-green-600 text-white rounded-xl shadow-xl hover:bg-green-700"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Yield Packages Section */}
          <div className="max-w-7xl mx-auto mt-10 p-5 yield">
            <h2 className="text-3xl font-bold text-center mb-5 text-gray-800 dark:text-gray-200">
              Yield Packages
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {yieldPackages.map((pkg, index) => (
                <div
                  key={index}
                  className="relative p-4 border yield transition duration-200 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-opacity-30 "></div>
                  <h3 className="text-xl font-semibold relative z-10 text-gray-800 dark:text-gray-200">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 relative z-10">
                    Investment: ${pkg.investment}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 relative z-10">
                    Yield: ${pkg.yield}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 relative z-10">
                    Total Return: ${pkg.yield}
                  </p>
                  <button
                    onClick={() => handleBuy(pkg)}
                    className="mt-4 w-full buy transition duration-200 relative z-10"
                  >
                    {loading ? "Processing..." : "Buy Now"}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-5 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                All incentives available at initiation only.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EcommerceReferralPage;
