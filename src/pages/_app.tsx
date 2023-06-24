import '../styles/global.css';

import type { AppProps } from 'next/app';
import { WagmiConfig } from 'wagmi';

import { wagmiConfig } from '@/configs/web3/wagmi';
import Web3Provider from '@/contexts/Web3Context';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <WagmiConfig config={wagmiConfig}>
    <Web3Provider>
      <Component {...pageProps} />
    </Web3Provider>
  </WagmiConfig>
);

export default MyApp;
