import type * as _tanstack_react_query from '@tanstack/react-query';
import type { ConnectArgs } from '@wagmi/core';
import type { ReactElement } from 'react';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';
import type { Chain } from 'wagmi';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi';

import type { ChainId } from '@/configs/web3/chains';
import {
  chains,
  DEFAULT_CHAIN_ID,
  SUPPORTED_CHAIN_IDS,
} from '@/configs/web3/chains';
import type { WalletId } from '@/configs/web3/wallets';
import { wallets } from '@/configs/web3/wallets';
import { BuildType } from '@/constants';
import type { HexString } from '@/types';

type ContextType = {
  chain: Chain;
  isSupported: boolean;
  connect: (args?: Partial<ConnectArgs> | undefined) => void;
  disconnect: _tanstack_react_query.UseMutateFunction<
    void,
    Error,
    void,
    unknown
  >;
  account: null | HexString;
  setMockAccount: React.Dispatch<React.SetStateAction<HexString | null>>;
  switchNetwork: (chainId: ChainId) => Promise<void>;
  activeWalletId?: WalletId;
};
const Web3Context = createContext<ContextType>({} as unknown as ContextType);
Web3Context.displayName = 'Web3Context';

interface Props {
  children: React.ReactNode;
}

export const useWeb3 = () => {
  return useContext(Web3Context);
};

function Web3Provider({ children }: Props): ReactElement {
  // view as another account for development purpose
  const [mockAccount, setMockAccount] = useState<HexString | null>(null);
  const { address: account, connector } = useAccount();
  const { chain: chainWithLogin } = useNetwork();
  // if user has not logged in, use the chainId from the local storage or default chainId
  const [cachedChainId, setCachedChainId] = useLocalStorage(
    'PREVIOUS_CHAIN_ID',
    DEFAULT_CHAIN_ID
  );
  const { switchNetworkAsync } = useSwitchNetwork();
  const { connect } = useConnect({
    onError: (error) => {
      console.log(
        error,
        '@todo: Please edit useConnect onError handler in web3context'
      );
    },
  });
  const { disconnect } = useDisconnect({
    onError: (error) => {
      console.log(
        error,
        '@todo: Please edit useDisconnect onError handler in web3context'
      );
    },
  });
  const switchNetwork = useCallback(
    async (chainId: ChainId) => {
      if (switchNetworkAsync) {
        try {
          await switchNetworkAsync(chains[chainId].id);
        } catch (error) {
          console.log(
            error,
            '@todo: Please edit switchNetworkAsync onError handler in web3context'
          );
        }
      }
      setCachedChainId(chainId);
    },
    [setCachedChainId, switchNetworkAsync]
  );
  const { chain, isSupported } = useMemo(() => {
    // if user has not logged in, use the chainId from the local storage or default chainId
    let initIsSupported = SUPPORTED_CHAIN_IDS.includes(cachedChainId);
    // if user has logged in, use the chainId from the RPC
    if (chainWithLogin) {
      const typedChainId = chainWithLogin.id as ChainId;
      initIsSupported = SUPPORTED_CHAIN_IDS.includes(typedChainId);
      if (initIsSupported) {
        return {
          chain: chains[typedChainId],
          isSupported: initIsSupported,
        };
      }
    }
    return {
      chain: chains[cachedChainId],
      isSupported: initIsSupported,
    };
  }, [chainWithLogin, cachedChainId]);
  useEffect(() => {
    // if user has logged in and update chain which is supported, update the previous chainId in the local storage
    if (chainWithLogin && SUPPORTED_CHAIN_IDS.includes(chainWithLogin.id)) {
      setCachedChainId(chainWithLogin.id as ChainId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainWithLogin]);

  const returnValue = useMemo(
    () => ({
      chain,
      isSupported,
      connect,
      disconnect,
      account:
        (process.env.NEXT_PUBLIC_BUILD_TYPE !== BuildType.production &&
          mockAccount) ||
        account ||
        null,
      setMockAccount,
      switchNetwork,
      activeWalletId: connector
        ? Object.values(wallets).find(
            (wallet) => wallet.connector === connector
          )?.id
        : undefined,
    }),
    [
      account,
      chain,
      connect,
      connector,
      disconnect,
      isSupported,
      mockAccount,
      switchNetwork,
    ]
  );
  return (
    <Web3Context.Provider value={returnValue}>{children}</Web3Context.Provider>
  );
}

export default Web3Provider;
