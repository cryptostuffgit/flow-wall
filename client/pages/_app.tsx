import '../styles/globals.css';
import '../styles/Main.scss';

import UserProvider from '@/utils/UserProvider';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
