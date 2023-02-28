import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MainView from '@/components/MainView';
import BrowseView from '@/components/BrowseView';
import CanvasView from '@/components/CanvasView';
import UserProvider from '@/utils/UserProvider';
import { useState, useEffect, useCallback } from 'react';
import '../flow/config';

export default function Home() {
  const [page, setPage] = useState('messages');

  return (
    <UserProvider>
      <div className="layout">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <Navbar page={page} setPage={setPage} />
          <div>
            <CanvasView hidden={page !== 'canvas'} />
            <MainView hidden={page !== 'messages'} />
            <BrowseView hidden={page !== 'browse'} setPage={setPage} />
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
