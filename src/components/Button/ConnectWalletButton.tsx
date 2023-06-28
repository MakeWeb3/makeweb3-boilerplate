import React, { useRef } from 'react';

import { wallets } from '@/configs/web3/wallets';
import { useWeb3 } from '@/contexts/Web3Context';

export default function ConnectWalletButton() {
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const { connect } = useWeb3();
  return (
    <>
      <button
        data-testid="connect-wallet"
        className="btn"
        onClick={() => dialogRef.current?.showModal()}
      >
        connect wallet
      </button>
      <dialog ref={dialogRef} className="modal">
        <form method="dialog" className="modal-box w-[350px] p-10">
          <button className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2">
            ✕
          </button>
          <div
            data-testid="connect-wallet-modal"
            className="flex flex-col space-y-9"
          >
            {Object.values(wallets)
              .filter((wallet) => !wallet.isHidden)
              .map((wallet) => (
                <button
                  onClick={() => {
                    connect({ connector: wallet.connector });
                  }}
                  className="btn h-[55px]"
                  key={wallet.id}
                >
                  <img
                    alt={wallet.id}
                    src={wallet.iconWithText.src}
                    width={wallet.iconWithText.width}
                    height={wallet.iconWithText.height}
                  />
                </button>
              ))}
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
