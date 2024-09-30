import React, { useState, useContext, createContext, useEffect } from "react";
import { ethers } from "ethers";
import { CheckIfWalletConnected, ConnectWallet, connectingWithContract, getBalance } from "../Utils/index";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [polls, setPolls] = useState([]);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pollCount, setPollCount] = useState(0);
    const [balance, setBalance] = useState("0");

    // Mock user data for profile
    const [currentUser, setCurrentUser] = useState({
        username: "Chalam Sanjay",
        bio: "Blockchain developer .",
        profilePicture: "/img/profile.jpg",
        achievements: [
            { name: "Top Voter", date: "2024-01-15" },
            { name: "Poll Creator", date: "2023-12-20" }
        ],
    });

    const [userPolls, setUserPolls] = useState([
        { title: "Poll 1", createdDate: "2024-09-25", status: "active" },
        { title: "Poll 2", createdDate: "2024-09-18", status: "ended" }
    ]);

    const [userVotes, setUserVotes] = useState([
        { pollTitle: "Poll 1", date: "2024-09-25" },
        { pollTitle: "Poll 2", date: "2024-09-26" }
    ]);

    const fetchInitialData = async () => {
        try {
            // GET USER ACCOUNT
            const account = await CheckIfWalletConnected();
            setCurrentAccount(account);

            // GET USER BALANCE
            const balance = await getBalance();
            setBalance(ethers.utils.formatEther(balance.toString()));

            // CONNECT TO CONTRACT
            const pollingsystem = await connectingWithContract();

            // GET POLL COUNT
            const count = await pollingsystem.getPollCount();
            setPollCount(count.toNumber());

            // FETCH ALL POLLS
            const fetchedPolls = [];
            for (let i = 0; i < count; i++) {
                const poll = await pollingsystem.getPolls(i);
                fetchedPolls.push({
                    title: poll[0],
                    options: poll[1],
                    votes: poll[2],
                    owner: poll[3],
                });
            }
            setPolls(fetchedPolls);
        } catch (error) {
            console.error("Error fetching initial data:", error);
        } finally {
            setLoading(false);
        }
    };

    const createPoll = async (title, options) => {
        try {
            const pollingsystem = await connectingWithContract();
            const tx = await pollingsystem.createPoll(title, options);
            await tx.wait(); 
            await fetchInitialData();
        } catch (error) {
            console.error("Error creating poll:", error);
        }
    };

    const vote = async (pollId, optionIndex) => {
        try {
            const pollingsystem = await connectingWithContract();
            const tx = await pollingsystem.vote(pollId, optionIndex);
            await tx.wait(); 
            await fetchInitialData(); 
        } catch (error) {
            console.error("Error voting:", error);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    return (
        <StateContext.Provider
            value={{
                polls,
                currentAccount,
                loading,
                balance,
                pollCount,
                createPoll,
                vote,
                currentUser, 
                userPolls,  
                userVotes,  
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
