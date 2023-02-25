import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import AddressForm from "../components/AddressForm";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [isExecutable, setIsExecutable] = useState("");

  const addressSubmittedHandler = async (address: string) => {
    try {
      const publicKey = new PublicKey(address);
      setAddress(address);
      const connection = new Connection(clusterApiUrl("devnet"));
      const retrievedBalance = await connection.getBalance(publicKey);
      setBalance(retrievedBalance / LAMPORTS_PER_SOL);
      const accountInfo = await connection.getAccountInfo(publicKey);
      accountInfo && setIsExecutable(accountInfo.executable ? "Yes" : "Nope");
    } catch (err) {
      setAddress("");
      setBalance(0);
      setIsExecutable("");
      alert(err);
    }
  };

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>Start Your Solana Journey</p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`Is it executable? ${isExecutable}`}</p>
      </header>
    </div>
  );
};

export default Home;
