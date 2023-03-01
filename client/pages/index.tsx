// @ts-nocheck

import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MainView from '@/components/MainView';
import BrowseView from '@/components/BrowseView';
import CanvasView from '@/components/CanvasView';
import UserProvider from '@/utils/UserProvider';
import UserContext from '@/utils/UserContext';
import LoadingProvider from '@/utils/LoadingProvider';
import { useState, useEffect, useCallback, useContext } from 'react';
import '../flow/config';

export default function Home() {
  const [page, setPage] = useState('canvas');
  const { searchAddress, setSearchAddress } = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const params = new Proxy(new URLSearchParams(window.location.search), {
          get: (searchParams, prop) => searchParams.get(prop),
        });

        if (params.page && params.address) {
          setPage(params.page);
          setSearchAddress(params.address);
        }
      }
    }, 200);
  }, []);

  if (
    searchAddress !== null &&
    searchAddress !== undefined &&
    searchAddress.length === 18
  ) {
    window.history.replaceState(
      {},
      'WaterFall',
      `?address=${searchAddress}&page=${page}`,
    );
  }

  return (
    <LoadingProvider>
      <div className="layout">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css?family=Golos+Text:regular,bold,italic&subset=latin,latin-ext"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
          />
        </Head>
        <div>
          <Navbar page={page} setPage={setPage} />
          <div style={{ margin: '35px' }}>
            <CanvasView hidden={page !== 'canvas'} />
            <MainView hidden={page !== 'messages'} />
            <BrowseView hidden={page !== 'browse'} setPage={setPage} />
          </div>
        </div>
      </div>
    </LoadingProvider>
  );
}
