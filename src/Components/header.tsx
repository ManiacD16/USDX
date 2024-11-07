import React, { useState, useRef, useEffect } from "react";
// import Logo from "./Images/Logo.svg";
// import Wallet from "./wallet";
import {
  Sun,
  Menu,
    Moon,
  Search,
  Monitor,
    Home,
  X,
//   TrendingUp,
//   DollarSign,
} from "lucide-react"; // Import Menu icon
import useClickOutside from "./useClickOutside"; // Import the custom hook
import { useNavigate } from "react-router-dom";
import { useWeb3Modal } from '@web3modal/ethers5/react';

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  showWalletAddress: boolean;
}

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen }) => {
     const { open} = useWeb3Modal();
const [isSearchActive, setIsSearchActive] = useState(false);    //   isSearchActive
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  
const applyTheme = (selectedTheme: React.SetStateAction<string>) => {
  const newTheme = typeof selectedTheme === 'function' ? selectedTheme(theme) : selectedTheme;
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);

  if (newTheme === "light") {
    document.documentElement.classList.remove("dark");
  } else if (newTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDarkScheme) {
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const renderThemeIcon = () => {
    if (theme === "light") {
      return <Sun className="h-5 w-5 text-gray-500 cursor-pointer" />;
    } else if (theme === "dark") {
      return <Moon className="h-5 w-5 text-gray-500 cursor-pointer" />;
    } else {
      return <Monitor className="h-5 w-5 text-gray-500 cursor-pointer" />;
    }
  };

  useClickOutside(searchRef, () => setIsSearchActive(false));
  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <header className="flex justify-between p-2 mt-2 ml-6 mr-6 dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-md rounded-lg">
      {/* Hamburger Menu (visible on small screens) */}
      <div className="flex items-center lg:hidden">
        <Menu
          className="h-6 w-6 text-gray-500 cursor-pointer"
          onClick={() => setIsSidebarOpen(true)}
        />
      </div>

      {/* Search bar and right-side icons */}
      <div className="flex items-center flex-1">
              {isSearchActive ? (
                  <div
                      ref={searchRef}
                      className="flex items-center rounded-lg px-4 py-2 w-full md:w-3/4 lg:w-full"
                  >
                      <Search className="h-5 w-5 text-gray-500 mr-3" />
                      <input
                          type="text"
                          placeholder="Search..."
                          className="bg-transparent focus:outline-none w-full text-gray-600"
                      />
                      <X
                          className="h-5 w-5 text-gray-500 cursor-pointer"
                          onClick={() => setIsSearchActive(false)}
                      />
                  </div>
              ) : (
                  <div className="flex items-center flex-1">
                      <div
                          ref={searchRef}
                          className="flex rounded-lg px-4 py-2 md:w-3/4 lg:w-1/2"
                      >
                          <Search
                              className="h-5 w-5 mr-3 cursor-pointer"
                              onClick={() => setIsSearchActive(true)}
                          />
                          <input
                              type="text"
                              placeholder="Search (Ctrl+/)"
                              className="bg-transparent focus:outline-none w-full"
                              onFocus={() => setIsSearchActive(true)}
                          />
                      </div>
                      {/* <div className="flex items-center justify-end w-full md:space-x-8 space-x-4 mr-2"></div>
                      <div className="flex flex-col mr-2">
                          <div className="flex items-center space-x-1">
                              <span className="text-Lg font-bold dark:text-yellow-100 text-black uppercase tracking-wide">
                                  HBTC
                              </span>
                              <TrendingUp className="w-3 h-3 text-green-300" aria-hidden="true" />
                              <div className="flex items-center text-lg font-bold text-black dark:text-gray-200 tracking-tight">
                                  <DollarSign className="w-4 h-4 mr-0.5" aria-hidden="true" />
                                  <span>1.00</span>
                              </div>
                          </div>
                      </div> */}

                      <div className="flex items-center justify-end w-full md:space-x-8 space-x-4 mr-2">
                          {/* <div
            className="rounded-xl shadow-lg inline-flex items-center space-x-2
              hover:shadow-xl transition-shadow duration-300"
          > */}
                          {/* <img
              src={Logo}
              alt="HBTC Logo"
              className=" w-6 h-6 sm:w-4 sm:h-4 object-cover"
            /> */}

                          {/* </div> */}
                          <Home className="h-5 w-5 text-gray-500 cursor-pointer"
                               onClick={() => { open();  navigate("/");}}
                          />
                          {/* Uncomment and adjust the dropdown as needed */}
                          <div ref={dropdownRef} className="relative">
                              <div onClick={toggleDropdown}>{renderThemeIcon()}</div>
                              {isDropdownOpen && (
                                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-10">
                                      <ul className="p-2 space-y-1">
                                          <li
                                              className={`flex items-center p-2 rounded-lg cursor-pointer ${theme === "light" ? "bg-indigo-100" : ""
                                                  }`}
                                              onClick={() => applyTheme("light")}
                                          >
                                              <Sun className="h-5 w-5 text-gray-500 mr-2" />
                                              <span className="text-gray-700">Light</span>
                                          </li>
                                          <li
                                              className={`flex items-center p-2 rounded-lg cursor-pointer ${theme === "dark" ? "bg-indigo-100" : ""
                                                  }`}
                                              onClick={() => applyTheme("dark")}
                                          >
                                              <Moon className="h-5 w-5 text-gray-500 mr-2" />
                                              <span className="text-gray-700">Dark</span>
                                          </li>
                                          <li
                                              className={`flex items-center p-2 rounded-lg cursor-pointer ${theme === "system" ? "bg-indigo-100" : ""
                                                  }`}
                                              onClick={() => applyTheme("system")}
                                          >
                                              <Monitor className="h-5 w-5 text-gray-500 mr-2" />
                                              <span className="text-gray-700">System</span>
                                          </li>
                                      </ul>
                                  </div>
                              )}
                          </div>
                          {/* <Grid className="h-5 w-5 text-gray-500 cursor-pointer" />
              <div className="relative">
                <Bell className="h-5 w-5 text-gray-500 cursor-pointer" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </div> */}
                          {/* <div className="relative w-9 h-9">
            <img
              src={Logo}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <span className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white rounded-full w-4 h-4"></span>
          </div> */}
                          {/* <Wallet /> */}
                      </div>
      
                  </div>)}
    </div>
    </header>
  );
};

export default Header;