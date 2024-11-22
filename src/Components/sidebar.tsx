import { useState, useContext, useEffect } from "react";
// import { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { contractAbi } from "./Props/contractAbi.ts";
import { contractAddress } from "./Props/contractAddress.ts";
import { ethers } from "ethers";
// import SimpleBar from "simplebar-react";
// import "simplebar-react/dist/simplebar.min.css"; // Import SimpleBar styles
import {
  Home,
  UsersIcon,
  ChevronDown,
  Circle,
  DollarSign,
  Lock,
  Gift,
  X,
} from "lucide-react"; // Using Lucide icons
import { useNavigate } from "react-router-dom";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { useWeb3Modal } from "@web3modal/ethers5/react";
// import Avatar1 from "./Images/Logo1.png";
// import Avatar2 from "./Images/Avatar.jpg";
// import Avatar3 from "./Images/Avatar1.jpg";
// import Avatar4 from "./Images/Avatar2.jpg";
// const avatars = [Avatar1, Avatar2, Avatar3, Avatar4];
import Preloader from "./Preloader.tsx"; // Import the Preloader component

const Sidebar = ({
  setIsSidebarOpen,
}: {
  setIsSidebarOpen: (isOpen: boolean) => void;
}) => {
  const { open } = useWeb3Modal();
  const [isTeamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [isStakeDropdownOpen, setStakeDropdownOpen] = useState(false);
  const [isIncomeDropdownOpen, setIncomeDropdownOpen] = useState(false);
  const [isRewardsDropdownOpen, setRewardsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [rank, setRank] = useState(null); // Initial state for the user's rank
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [userData2, setUserData2] = useState<{ rk?: number }>({});
  type Rank = "Starter" | "Bronze" | "Silver" | "Gold" | "Diamond";

  const rankLabels: Rank[] = ["Starter", "Bronze", "Silver", "Gold", "Diamond"];
  // const [token, setToken] = useState(localStorage.getItem("token"));
  //  const [isLoggingOut, setIsLoggingOut] = useState(false);
  //   const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [isOpen, setIsOpen] = useState(false);
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const toggleTeamDropdown = () => {
    setTeamDropdownOpen(!isTeamDropdownOpen);
    setStakeDropdownOpen(false);
    setIncomeDropdownOpen(false);
    setRewardsDropdownOpen(false);
  };

  const toggleStakeDropdown = () => {
    setStakeDropdownOpen(!isStakeDropdownOpen);
    setIncomeDropdownOpen(false);
    setRewardsDropdownOpen(false);
  };

  const toggleIncomeDropdown = () => {
    setIncomeDropdownOpen(!isIncomeDropdownOpen);
    setStakeDropdownOpen(false);
    setRewardsDropdownOpen(false);
  };

  const toggleRewardsDropdown = () => {
    setRewardsDropdownOpen(!isRewardsDropdownOpen);
    setStakeDropdownOpen(false);
    setIncomeDropdownOpen(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (address && contract) {
        const user2 = await contract.users2(address);
        console.log("User data:", user2);
        setUserData2(user2);
      }
    };

    fetchUserData();
  }, [address, contract]);

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
      }
    };
    a();
  }, [walletProvider]);

  return (
    <div className="min-h-screen w-64 bg-blue-100 shadow-2xl dark:from-blue-900 dark:to-blue-400">
      {/* <SimpleBar style={{ maxHeight: "100vh" }}> */}

      <div
        className="p-6 flex justify-between items-center"
        style={{ maxHeight: "100vh" }}
      >
        <div className="flex items-center">
          {/* <div className="avatar-selector">
              <div onClick={togglePopup} className="cursor-pointer">
                <img
                  src={selectedAvatar}
                  alt="Profile"
                  className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 object-cover"
                />
              </div>

              {isOpen && (
                <div className="popup">
                  <div className="popup-content">
                    <div className="avatar-options grid grid-cols-4 gap-4">
                      {avatars.map((avatar, index) => (
                        <img
                          key={index}
                          src={avatar}
                          alt={`Avatar ${index + 1}`}
                          className={`w-12 h-12 object-cover cursor-pointer ${
                            selectedAvatar === avatar ? "border-2 border-blue-500" : ""
                          }`}
                          onClick={() => handleAvatarClick(avatar)}
                        />
                      ))}
                    </div>
                    <button onClick={togglePopup} className="mt-4">
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div> */}
          <div className="side">
            <h1 className="ml-3 text-gray-600 text-2xl font-bold">
              <strong>{rankLabels[userData2?.rk ?? 0]}</strong>
            </h1>
          </div>
        </div>
        <button
          className="lg:hidden text-gray-500"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      {loading ? ( // Render the preloader if loading
        <Preloader />
      ) : (
        <nav className="mt-0 ml-4 mr-4">
          <div
            className="flex items-center justify-between p-3 hover:bg-gray-700 rounded-lg cursor-pointer"
            onClick={() => navigate("/user")}
          >
            <div className="flex items-center space-x-3">
              <Home className="h-5 w-5 text-gray-500 dark:text-slate-300 " />
              <span className="text-gray-500 dark:text-slate-300 hover:text-gray-200">
                Dashboards
              </span>
            </div>
          </div>

          {/* Team Dropdown */}
          <div>
            <div
              className="flex items-center p-3 hover:bg-gray-700 rounded-lg cursor-pointer"
              onClick={() => {
                toggleTeamDropdown(); // Call your dropdown toggle function
                navigate("/team"); // Navigate to team.js
              }}
            >
              <UsersIcon className="h-5 w-5 text-gray-500 dark:text-slate-300" />
              <span className="ml-3 text-gray-500 dark:text-slate-300 hover:text-gray-200 flex-grow">
                Team
              </span>
              <ChevronDown
                className={`h-5 w-5 dark:text-gray-200 text-gray-500 transition-transform duration-300 ease-in-out transform ${
                  isTeamDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isTeamDropdownOpen
                  ? "max-h-64 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="text-m mt-2 space-y-4 ml-4">
                {["My Directs", "Total Team"].map((item) => (
                  <li key={item} className="flex items-center space-x-2">
                    <Circle className="h-3 w-3 text-gray-500 dark:text-gray-200" />
                    <span className="text-gray-700 dark:text-gray-200">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stake Dropdown */}
          <div>
            <div
              className="flex items-center p-3 hover:bg-gray-700 rounded-lg cursor-pointer"
              onClick={() => {
                toggleStakeDropdown(); // Call your dropdown toggle function
                navigate("/stake"); // Navigate to team.js
              }}
            >
              <Lock className="h-5 w-5 text-gray-500 dark:text-slate-300" />
              <span className="ml-3 text-gray-500 dark:text-slate-300 hover:text-gray-200 flex-grow">
                Stake
              </span>
              <ChevronDown
                className={`h-5 w-5 dark:text-gray-200 text-gray-500 transition-transform duration-300 ease-in-out transform ${
                  isStakeDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isStakeDropdownOpen
                  ? "max-h-64 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="text-m mt-2 space-y-4 ml-4">
                {["Stake", "Affiliate Stake"].map((item) => (
                  <li key={item} className="flex items-center space-x-2">
                    <Circle className="h-3 w-3 text-gray-500 dark:text-gray-200" />
                    <span className="text-gray-700 dark:text-gray-200">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Income Dropdown */}
          <div>
            <div
              className="flex items-center p-3 hover:bg-gray-700 rounded-lg cursor-pointer"
              onClick={() => {
                toggleIncomeDropdown(); // Call your dropdown toggle function
                navigate("/income"); // Navigate to team.js
              }}
            >
              <DollarSign className="h-5 w-5 text-gray-500 dark:text-slate-300" />
              <span className="ml-3 text-gray-500 dark:text-slate-300 hover:text-gray-200 flex-grow">
                Income
              </span>
              <ChevronDown
                className={`h-5 w-5 dark:text-gray-200 text-gray-500 transition-transform duration-300 ease-in-out transform ${
                  isIncomeDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isIncomeDropdownOpen
                  ? "max-h-64 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="text-m mt-2 space-y-4 ml-4">
                {["Direct Income", "Level Income"].map((item) => (
                  <li key={item} className="flex items-center space-x-2">
                    <Circle className="h-3 w-3 text-gray-500 dark:text-gray-200" />
                    <span className="text-gray-700 dark:text-gray-200">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rewards Dropdown */}
          <div>
            <div
              className="flex items-center p-3 hover:bg-gray-700 rounded-lg cursor-pointer"
              onClick={() => {
                toggleRewardsDropdown(); // Call your dropdown toggle function
                navigate("/ranks"); // Navigate to Ranks.tsx
              }}
            >
              <Gift className="h-5 w-5 text-gray-500 dark:text-slate-300" />
              <span className="ml-3 text-gray-500 dark:text-slate-300 hover:text-gray-200 flex-grow">
                Ranks
              </span>
              <ChevronDown
                className={`h-5 w-5 dark:text-gray-200 text-gray-500 transition-transform duration-300 ease-in-out transform ${
                  isRewardsDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isRewardsDropdownOpen
                  ? "max-h-64 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="text-m mt-2 space-y-4 ml-4">
                {["Amount Allocated", "Active Users"].map((item) => (
                  <li key={item} className="flex items-center space-x-2">
                    <Circle className="h-3 w-3 text-gray-500 dark:text-gray-200" />
                    <span className="text-gray-700 dark:text-gray-200">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Connect Wallet Button */}
          <div className="flex flex-col items-center justify-center mt-10">
            <button
              id="wallet-button"
              className="button text-black k px-6 py-3   transition duration-200 flex items-center mb-2"
              onClick={() => {
                open();
                navigate("/");
              }} // Use connectWallet from context
            >
              <strong>
                {address
                  ? `${address.slice(0, 6)}...${address.slice(-4)}`
                  : "Connect Wallet"}
              </strong>
            </button>
          </div>
        </nav>
      )}
      {/* </SimpleBar> */}
    </div>
  );
};

export default Sidebar;
