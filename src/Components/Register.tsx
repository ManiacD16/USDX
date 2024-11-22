import { useState, useEffect } from "react";
import { ethers } from "ethers";
// import Header from "./header.tsx";
// import "./Register.css";
import { useNavigate, useLocation } from "react-router-dom";
import { contractAbi } from "./Props/contractAbi.ts";
import { contractAddress } from "./Props/contractAddress.ts";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { useWeb3Modal } from "@web3modal/ethers5/react";

const Register = () => {
  const { open } = useWeb3Modal();
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasApproval, setHasApproval] = useState(false);
  const [referralAddress, setReferralAddress] = useState("");
  const navigate = useNavigate();
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();
  const [signer, setSigner] = useState<null | ethers.Signer>(null);

  const usdtAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT token address on BSC Testnet
  const usdtAbi = [
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  useEffect(() => {
    if (walletProvider) {
      const a = async () => {
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const signer = provider.getSigner();
        setSigner(signer);
        const newContract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        setContract(newContract);
        checkRegistrationStatus(newContract);
      };
      a();
    }
  }, [walletProvider]);

  const checkRegistrationStatus = async (contract: ethers.Contract) => {
    const userExists = await contract.isUserExists(address);
    setIsRegistered(userExists);
    if (userExists) {
      alert("You are already registered!");
      navigate("/user");
    }
  };

  const handleRegistration = async () => {
    if (!referralAddress) {
      alert("Please enter a referral address.");
      return;
    }
    if (signer === null) {
      return;
    }
    try {
      if (contract === null) {
        console.error("Contract is null. Cannot proceed with registration.");
        return;
      }
      const tx = await contract.regUsr(address, referralAddress);
      await tx.wait();
      alert("Registration successful!");
      navigate("/user");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleApproveAndRegister = async () => {
    if (!hasApproval) {
      if (signer === null) {
        console.error("Signer is null. Cannot proceed with approval.");
        return;
      }
      try {
        const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, signer);
        const amountToApprove = ethers.utils.parseUnits("10", 18);
        const tx = await usdtContract.approve(contractAddress, amountToApprove);
        await tx.wait();
        alert("Approval successful for 10 USDT!");
        setHasApproval(true);
      } catch (error) {
        console.error("Approval failed:", error);
        return;
      }
    }

    await handleRegistration();
  };

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const referral = queryParams.get("referral");
    if (referral) {
      setReferralAddress(referral);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 flex-1 overflow-auto">
      <div className="floating-container  z-10 w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="flex items-center justify-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-teal-400 tracking-wider">
              TMC
            </h1>
            {/* <p className="text-teal-400 text-sm tracking-wider">
              Trade Market Cap
            </p> */}
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">
          Connect Your Wallet
        </h2>
        <p className="text-gray-400 mb-8">
          Please connect your wallet to proceed.
        </p>

        {/* Wallet connection */}
        {!address && (
          <button
            className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded mb-4 transition duration-300"
            onClick={() => open()}
          >
            CONNECT WALLET
          </button>
        )}

        {address && (
          <div>
            <p className="hidden md:block overflow-hidden text-slate-200 mt-4">
              Connected address: {address}
            </p>
            <p className="overflow-hidden text-slate-200 mt-4 md:hidden">
              Connected address:{" "}
              {`${address.slice(0, 6)}...${address.slice(-4)}`}
            </p>

            {isRegistered ? (
              <p className="text-green-300 mt-4">You are already registered!</p>
            ) : (
              <div>
                <p className="text-red-400 mt-4">You are not registered yet!</p>
                <div className="mt-8">
                  <input
                    type="text"
                    placeholder="Enter referral address"
                    value={referralAddress}
                    onChange={(e) => setReferralAddress(e.target.value)}
                    className="border rounded p-2 w-full text-white bg-gray-700 border-teal-500"
                  />
                  <div className="flex justify-center">
                    <button
                      className={`bg-${
                        hasApproval ? "transparent" : "transparent"
                      } hover:bg-teal-600 text-white border border-teal-500 hover:border-black hover:text-black font-bold py-2 px-4 rounded mt-4`}
                      onClick={handleApproveAndRegister}
                    >
                      {hasApproval ? "Register" : "Approve and Register"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
