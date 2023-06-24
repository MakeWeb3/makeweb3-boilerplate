import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { chains } from './chains';
import { wallets } from './wallets';

const { publicClient, webSocketPublicClient } = configureChains(
  Object.values(chains),
  [publicProvider()]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: Object.values(wallets).map((wallet) => wallet.connector),
});
