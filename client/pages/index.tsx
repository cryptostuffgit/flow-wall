import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MainView from '@/components/MainView';
import BrowseView from '@/components/BrowseView';
import { useState, useEffect, useCallback } from 'react';
import * as fcl from '@onflow/fcl';
import '../flow/config';

export default function Home() {
  const [user, setUser] = useState({ loggedIn: null, addr: null });
  
  const [userAddress, setUserAddress] = useState<any>(null);
  const [page, setPage] = useState("messages")

  useEffect(() => fcl.currentUser.subscribe(setUser), []);
  useEffect(() => {
    setUserAddress(user.addr);
  }, [user]);

  return (
    <div className="layout">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Navbar user={user} setUserAddress={setUserAddress} page={page} setPage={setPage}/>
        <div className={styles.container}>
          {page == "canvas" ? 
            <></> : 
            page == "messages" ? 
            <MainView user={user} userAddress={userAddress}/> 
            : <BrowseView />}
        </div>
      </div>
    </div>
  );
}
