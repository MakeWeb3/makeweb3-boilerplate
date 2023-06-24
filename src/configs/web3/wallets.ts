import { MetaMaskConnector } from '@wagmi/connectors/metaMask';
import { WalletConnectLegacyConnector } from '@wagmi/core/connectors/walletConnectLegacy';
import type { Connector } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { SafeConnector } from 'wagmi/connectors/safe';

import { AppConfig } from '@/constants/AppConfig';

import { chains, SUPPORTED_CHAIN_IDS } from './chains';

export enum WalletId {
  METAMASK = 'METAMASK',
  WALLETCONNECT = 'WALLETCONNECT',
  TRUSTWALLET = 'TRUSTWALLET',
  COINBASEWALLET = 'COINBASEWALLET',
  GNOSISSAFE = 'GNOSISSAFE',
}

type Props = {
  id: WalletId;
  isHidden: boolean;
  connector: Connector;
  name: string;
  icon: string;
  iconWithText: {
    src: string;
    width?: number;
  };
};
class Wallet {
  readonly connector: Connector;

  readonly name: string;

  readonly isHidden: boolean;

  readonly id: WalletId;

  readonly icon: string;

  readonly iconWithText: {
    src: string;
    height?: number;
    width?: number;
  };

  constructor({ id, connector, icon, iconWithText, name, isHidden }: Props) {
    this.id = id;
    this.isHidden = isHidden;
    this.connector = connector;
    this.icon = icon;
    this.iconWithText = iconWithText;
    this.name = name || connector.name;
  }
}
export const wallets: { [id in WalletId]: Wallet } = {
  [WalletId.METAMASK]: new Wallet({
    id: WalletId.METAMASK,
    isHidden: false,
    name: 'MetaMask',
    connector: new MetaMaskConnector({ chains: Object.values(chains) }),
    icon: '/assets/images/wallets/metamask.svg',
    iconWithText: { src: '/assets/images/wallets/withText/metamask.svg' },
  }),
  [WalletId.WALLETCONNECT]: new Wallet({
    id: WalletId.WALLETCONNECT,
    isHidden: false,
    name: 'WalletConnect',
    connector: new WalletConnectLegacyConnector({
      chains: Object.values(chains),
      options: {
        qrcode: true,
        rpc: SUPPORTED_CHAIN_IDS.reduce<{ [id in number]: string }>(
          (prev, chainId) => ({
            ...prev,
            [chainId]: chains[chainId].rpcUrls.default.http[0] || '',
          }),
          {}
        ),
      },
    }),
    icon: '/assets/images/wallets/walletconnect.svg',
    iconWithText: { src: '/assets/images/wallets/withText/walletconnect.svg' },
  }),
  [WalletId.TRUSTWALLET]: new Wallet({
    id: WalletId.TRUSTWALLET,
    isHidden: false,
    name: 'TrustWallet',
    connector: new InjectedConnector({
      chains: Object.values(chains),
      options: {
        name: 'Trust Wallet',
        getProvider: () =>
          typeof window !== 'undefined' ? window.trustwallet : undefined,
      },
    }),
    icon: '/assets/images/wallets/trustwallet.svg',
    iconWithText: {
      src: '/assets/images/wallets/withText/trustwallet.svg',
      width: 150,
    },
  }),
  [WalletId.COINBASEWALLET]: new Wallet({
    name: 'CoinbaseWallet',
    id: WalletId.COINBASEWALLET,
    isHidden: false,
    connector: new CoinbaseWalletConnector({
      chains: Object.values(chains),
      options: {
        appName: AppConfig.site_name,
      },
    }),
    icon: '/assets/images/wallets/coinbasewallet.svg',
    iconWithText: { src: '/assets/images/wallets/withText/coinbasewallet.svg' },
  }),
  [WalletId.GNOSISSAFE]: new Wallet({
    id: WalletId.GNOSISSAFE,
    name: 'GnosisSafe',
    connector: new SafeConnector({ chains: Object.values(chains) }),
    isHidden: true,
    icon: 'assets/images/wallets/gnosissafe.png',
    iconWithText: {
      src: 'assets/images/wallets/withText/gnosissafe.png',
      width: 100,
    },
  }),
};
