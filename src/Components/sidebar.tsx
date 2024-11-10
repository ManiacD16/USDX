import { useState, useContext, useEffect } from "react";
// import { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useWeb3Modal } from "@web3modal/ethers5/react";
// import SimpleBar from "simplebar-react";
// import "simplebar-react/dist/simplebar.min.css"; // Import SimpleBar styles
import {
  Home,
  // UsersIcon,
  // ChartBarIcon,
  // ChevronDown,
  Circle,
  X,
} from "lucide-react"; // Using Lucide icons
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import AuthContext
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
  const { RemoveTokenFromLS } = useAuth();
  const { token: userToken } = useAuth(); // Access token and isAuthenticated from AuthContext
  // const [isTeamDropdownOpen, setTeamDropdownOpen] = useState(false);
  // const [isStakeDropdownOpen, setStakeDropdownOpen] = useState(false);
  // const [isIncomeDropdownOpen, setIncomeDropdownOpen] = useState(false);
  // const [isRewardsDropdownOpen, setRewardsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  const navigate = useNavigate();
  const [rank, setRank] = useState(null); // Initial state for the user's rank
  // const [token, setToken] = useState(localStorage.getItem("token"));
  //  const [isLoggingOut, setIsLoggingOut] = useState(false);
  //   const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  //   const [isOpen, setIsOpen] = useState(false);

  const { dispatch } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure cookies are included
      });

      if (res.ok) {
        // Clear the token from localStorage using the auth context
        RemoveTokenFromLS();

        // Update the user state to logged out
        dispatch({ type: "USER", payload: false });

        // Navigate to the login page
        navigate("/login", { replace: true });
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Logout failed. Please try again.");
      }
    } catch (err) {
      console.log("Logout error:", err);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  // const handleDeleteAccount = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null); // Reset any previous error
  //     setMessage(null); // Reset any previous message

  //     const response = await fetch("http://localhost:3000/api/auth/delete", {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ password, confirmMessage }),
  //     });

  //     if (!response.ok) {
  //       const data = await response.json();
  //       throw new Error(data.error || "Failed to delete account");
  //     }

  //     const data = await response.json();
  //     setMessage(data.message); // Show success message
  //     // Optionally, redirect the user to a different page
  //     // window.location.href = '/login';  // Redirect to login page after account deletion
  //   } catch (error: any) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const toggleTeamDropdown = () => {
  //   setTeamDropdownOpen(!isTeamDropdownOpen);
  //   setStakeDropdownOpen(false);
  //   setIncomeDropdownOpen(false);
  //   setRewardsDropdownOpen(false);
  // };

  // const toggleStakeDropdown = () => {
  //   setStakeDropdownOpen(!isStakeDropdownOpen);
  //   setIncomeDropdownOpen(false);
  //   setRewardsDropdownOpen(false);
  // };

  // const toggleIncomeDropdown = () => {
  //   setIncomeDropdownOpen(!isIncomeDropdownOpen);
  //   setStakeDropdownOpen(false);
  //   setRewardsDropdownOpen(false);
  // };

  // const toggleRewardsDropdown = () => {
  //   setRewardsDropdownOpen(!isRewardsDropdownOpen);
  //   setStakeDropdownOpen(false);
  //   setIncomeDropdownOpen(false);
  // };

  //   const handleAvatarClick = (avatar: string) => {
  //     setSelectedAvatar(avatar);
  //     setIsOpen(false);
  //   };

  //   const togglePopup = () => {
  //     setIsOpen(!isOpen);
  //   };

  //  const handleLogout = async () => {
  //     setIsLoggingOut(true);
  //     try {
  //         await logout(); // Use the logout function from context
  //         alert('Logout Successful.');
  //       navigate('/login'); // Redirect to login after successful logout
  //     } catch (error) {
  //       console.error('Error during logout:', error);
  //       alert('Logout failed. Please try again.'); // Show an error message if logout fails
  //     } finally {
  //       setIsLoggingOut(false);
  //     }
  //   };

  useEffect(() => {
    async function getUserRank() {
      try {
        // Send a GET request to the backend to get the user's rank
        const response = await fetch(
          "http://localhost:3000/api/investments/determineRank",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("User Rank:", data.rank); // Log the rank to the console for debugging
          setRank(data.rank); // Update state with the rank
        } else {
          const errorData = await response.json();
          setError(errorData.error); // Set error state if the request fails
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch user rank");
      } finally {
        setLoading(false); // Stop loading once the request is completed
      }
    }

    getUserRank();
  }, [userToken]); // Only run this effect when the userToken changes

  const handleClick = () => {
    // Trigger wallet modal open first, then logout
    open(); // Open the Web3Modal
    handleLogout(); // Log the user out
  };

  return (
    <div className="min-h-screen w-64 bg-gradient-to-r from-blue-200 to-blue-400 shadow-2xl dark:from-blue-900 dark:to-blue-400">
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

          <h1 className="ml-3 text-yellow-500 text-2xl font-bold">{rank}</h1>
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
              <Home className="h-5 w-5 text-gray-500 dark:text-slate-300" />
              <span className="text-gray-500 dark:text-slate-300 hover:text-gray-200">
                Dashboards
              </span>
            </div>
          </div>

          {/* Team Dropdown */}
          {/* <div>
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
          </div> */}

          {/* Stake Dropdown */}
          {/* <div>
            <div
              className="flex items-center p-3 hover:bg-gray-700 rounded-lg cursor-pointer"
              onClick={() => {
                toggleStakeDropdown(); // Call your dropdown toggle function
                navigate("/stake"); // Navigate to team.js
              }}
            >
              <ChartBarIcon className="h-5 w-5 text-gray-500 dark:text-slate-300" />
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
          </div> */}

          {/* Income Dropdown */}
          {/* <div>
            <div
              className="flex items-center p-3 hover:bg-gray-700 rounded-lg cursor-pointer"
              onClick={() => {
                toggleIncomeDropdown(); // Call your dropdown toggle function
                navigate("/income"); // Navigate to team.js
              }}
            >
              <ChartBarIcon className="h-5 w-5 text-gray-500 dark:text-slate-300" />
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
          </div> */}

          {/* Rewards Dropdown */}
          {/* <div>
            <div
              className="flex items-center p-3 hover:bg-gray-700 rounded-lg cursor-pointer"
              onClick={() => {
                toggleRewardsDropdown(); // Call your dropdown toggle function
                navigate("/rewards"); // Navigate to team.js
              }}
            >
              <ChartBarIcon className="h-5 w-5 text-gray-500 dark:text-slate-300" />
              <span className="ml-3 text-gray-500 dark:text-slate-300 hover:text-gray-200 flex-grow">
                Rewards
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
                {["Weekly Rewards", "Royalty Rewards"].map((item) => (
                  <li key={item} className="flex items-center space-x-2">
                    <Circle className="h-3 w-3 text-gray-500 dark:text-gray-200" />
                    <span className="text-gray-700 dark:text-gray-200">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          {/* Log Out Button */}
          <div
            className="flex items-center p-3 hover:bg-gray-700 rounded-lg cursor-pointer mt-4"
            onClick={handleClick}
          >
            {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
            {/* Display error message */}
            <Circle className="h-3 w-3 text-gray-500 dark:text-gray-200" />
            <span className="ml-3 text-gray-500 dark:text-slate-300">
              Log Out
            </span>
          </div>
        </nav>
      )}
      {/* </SimpleBar> */}
    </div>
  );
};

export default Sidebar;
