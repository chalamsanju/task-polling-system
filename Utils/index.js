import { ethers } from "ethers";
import Web3Modal from "web3modal"; 
import { POLLINGSYSTEM_ADDRESS, POLLING_ABI } from "../Context/constants";

export const CheckIfWalletConnected = async () => {
  try {
    if (!window.ethereum) {
      console.log("Install Metamask");
      return null;
    }

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    return accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error("Error checking if wallet is connected:", error);
    return null;
  }
};

export const ConnectWallet = async () => {
  try {
    if (!window.ethereum) {
      console.log("Install Metamask");
      return null;
    }

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    return null;
  }
};

const fetchContract = (signerOrProvider) => {
  return new ethers.Contract(POLLINGSYSTEM_ADDRESS, POLLING_ABI, signerOrProvider);
};

export const connectingWithContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    return fetchContract(signer);
  } catch (error) {
    console.error("Error connecting with contract:", error);
    return null;
  }
};

export const getBalance = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const balance = await signer.getBalance();
    return ethers.utils.formatEther(balance); // Convert balance from wei to ether
  } catch (error) {
    console.error("Error getting balance:", error);
    return null;
  }
};
