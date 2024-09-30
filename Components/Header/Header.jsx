import React, { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import styles from './Header.module.css';  
import Button from "../Button";
import Link from "next/link"; 

const Header = () => {
  const [address, setAddress] = useState(null);
  const [accountBalance, setAccountBalance] = useState(null);

  
  const connectWallet = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      const web3 = new Web3(provider);

      try {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0];
        setAddress(userAddress);

        const balanceInWei = await web3.eth.getBalance(userAddress);
        const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");
        setAccountBalance(balanceInEth);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  
  const shortenAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <header className={styles["header-one"]}>
      <div className={styles["header-menu-area"]}>
        <div className={styles["container"]}>
          <div className={styles["row"]}>
            <div className={styles["logo-container"]}>
              <Link href="/" className={styles["logo"]}>
                <img src="img/logo/logo4.png" alt="logo" width={180} height={60} />
              </Link>
            </div>
          </div>
        </div>
        <nav id="mobile-menu">
          <ul className={`${styles["new-nav-class"]} ${styles["main-menu"]}`}>
            <li className={styles["resulta"]}><Link href="/#">Home</Link></li>
            <li className={styles["resulta"]}><Link href="/UserProfilePage">UserProfile</Link></li> 
            <li className={styles["resulta"]}><Link href="/PollDetailsPage">PollDetailsPage</Link></li> 
           
          </ul>
        </nav>

        <div className={styles["menu-container"]}>
          <div className={styles["header-right"]}>
            {/* Directly use Link without wrapping it in an <a> tag */}
            <Link href="/PollCreationForm" className={styles["top-btn"]}>
              Create Poll
            </Link>
          </div>
        </div>

      
        <div className={styles["wallet-section"]}>
          {address ? (
            <Button
              name={`${shortenAddress(address)} : ${accountBalance?.slice(0, 5)} ETH`}
              classStyle={styles["top-btn"]}
            />
          ) : (
            <Button
              name="Connect Wallet"
              handleClick={connectWallet}
              classStyle={styles["top-btn"]} 
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
