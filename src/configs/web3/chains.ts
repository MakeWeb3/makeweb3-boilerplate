import type { Chain as WagmiChain } from '@wagmi/core/chains';
import { avalanche, avalancheFuji } from 'viem/chains';

import { BuildType, CHAIN_LOGO_FOLDER } from '@/constants';

export enum ChainId {
  AVALANCHE_FUJI = 43113,
  AVALANCHE_MAINNET = 43114,
}

export const SUPPORTED_CHAIN_IDS =
  process.env.NEXT_PUBLIC_BUILD_TYPE === BuildType.production
    ? [ChainId.AVALANCHE_MAINNET]
    : [ChainId.AVALANCHE_MAINNET, ChainId.AVALANCHE_FUJI];

export const DEFAULT_CHAIN_ID =
  process.env.NEXT_PUBLIC_BUILD_TYPE === BuildType.production
    ? ChainId.AVALANCHE_MAINNET
    : ChainId.AVALANCHE_FUJI;

export interface Chain extends WagmiChain {
  icon: string;
  name: string;
}

export const chains: {
  [id in ChainId]: Chain;
} = {
  [ChainId.AVALANCHE_FUJI]: {
    ...avalancheFuji,
    icon: `${CHAIN_LOGO_FOLDER}/avalanche.svg`,
    name: 'Avalanche Fuji',
  },
  [ChainId.AVALANCHE_MAINNET]: {
    ...avalanche,
    icon: `${CHAIN_LOGO_FOLDER}/avalanche.svg`,
    name: 'Avalanche Mainnet',
  },
};
