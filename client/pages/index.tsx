import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MainView from '@/components/MainView';
import { useState, useEffect, useCallback } from 'react';
import * as fcl from '@onflow/fcl';
import '../flow/config';

export default function Home() {
  const [user, setUser] = useState({ loggedIn: null, addr: null });

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  const [userAddress, setUserAddress] = useState<any>(null);

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
        <Navbar user={user} setUserAddress={setUserAddress} />
        <div className={styles.container}>
          <MainView user={user} userAddress={userAddress} />
        </div>
      </div>
      <Footer user={user} fcl={fcl} />
    </div>
  );
}
