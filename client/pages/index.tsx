import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MainView from '@/components/MainView';
import { useState, useEffect } from 'react';
import * as fcl from "@onflow/fcl";
import "../flow/config";

export default function Home() {
  const [user, setUser] = useState({loggedIn: null, addr: null})
  const [userWall, setUserWall] = useState<any>(null)

  useEffect(() => fcl.currentUser.subscribe(setUser), [])
  useEffect(() => {
    setUserWall(user.addr)
  }, [user])


  return (
    <div className="layout">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Navbar user={user} setUserWall={setUserWall}/>
        <div className={styles.container}>
          <MainView user={user} userWall={userWall}/>
        </div>
      </div>
      <Footer user={user} fcl={fcl}/>
    </div>
  );
}