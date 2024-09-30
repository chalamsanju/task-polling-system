import {ethers} from "ethers";
import Web3Modal from "web3modal";

import pollingsystem from "./PollingSystem.json";

export const POLLINGSYSTEM_ADDRESS= process.env.NEXT_PUBLIC_POLLINGSYSTEM_ADDRESS;
export const POLLING_ABI = pollingsystem.abi;

//PINATA KEY
export const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
export const PINATA_SECREAT_KEY = process.env.NEXT_PUBLIC_PINATA_SECREAT_KEY;

//NETWORKS
const networks = {
    Holesky: {
        chainId: `0x${Number(17000).toString(16)}`,
        chainName: "Holesky",
        nativeCurrency: {
            name: "ETHER",
            symbol: "ETH",
            decimals:18,


        },
        rpcUrls: ["https://rpc.ankr.com/eth_holesky"],
        blockExplorerUrls: ["https://holesky.etherscan.io/"],
    },

    polygon: {
        chainId: `0x${Number(137).toString(16)}`,
        chainName: "Polygon Miannet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,

        },
            rpcUrls : ["https://rpc.ankr.com/polygon"],
            blockExplorerUrls: ["https://polygonscan.com"],
    },

    bsc: {
        chainId: `0x${Number(56).toString(16)}`,
        chainName: "Binance Miannet",
        nativeCurrency: {
            name: "Binance Chain",
            symbol: "BNB",
            decimals: 18,

        },
            rpcUrls : ["https://rpc.ankr.com/bsc"],
            blockExplorerUrls: ["https://bscscan.com"],
    },

    base_mainnet: {
        chainId: `0x${Number(8453).toString(16)}`,
        chainName: "Base Miannet",
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,

        },
            rpcUrls : ["https://mainnet.base.org"],
            blockExplorerUrls: ["https://bscscan.com"],
    },
};
//WE ARE CONFIGURING WIHT HOLESKY IF USER DOING WITH OTHER NETWORKS LIKE BINANCE, BASE WE WANT TO WRTIE FUN TO CHANGE THAT

const ChangeNetwork = async ({ networkName }) => {
    try {
        if(!window.ethereum)throw new Error("No  wallet found");
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    ...networks[networkName],
                }
            ],
        });
    } catch (error) {
        console.log(error);

    }

};

export const handleNetworkSwitch = async() => {
    const networkName = "holesky"; 
    await  ChangeNetwork({ networkName });
};

export const shortenAddress = (address) =>
    `${address?.slice(0, 5)}...${address?.slice(address.length - 4)}`;

//CONTRACT

const fetchContract = (address, abi, signer) =>
    new ethers.Contract(address, abi, signer);

export const POLLINGSYSTEM_CONTRACT = async () => {
    try{
        //web3 makes to intract with the wallet
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();

        const contract = fetchContract(POLLINGSYSTEM_ADDRESS, POLLING_ABI, signer);
        return contract;
    
    }catch(error){
        console.log(error);
    }

};








