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

  const [userAddress, setuserAddress] = useState<any>(null);

  useEffect(() => fcl.currentUser.subscribe(setUser), []);
  useEffect(() => {
    setuserAddress(user.addr);
  }, [user]);

  return (
    <div className="layout">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Navbar user={user} setuserAddress={setuserAddress} />
        <div className={styles.container}>
          <MainView user={user} userAddress={userAddress} />
        </div>
      </div>
      <Footer user={user} fcl={fcl} />
    </div>
  );
}
