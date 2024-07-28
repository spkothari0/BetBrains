import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import Button from '@mui/material/Button';
const Nav = () => {
    const router = useRouter();
    const { address, isConnected } = useAccount();
  
    return (
      <div className="border-b-2 border-finanflixWhite h-[60px] flex justify-between">
        <div className="h-[28px] my-auto ml-5 cursor-pointer">
          <Link href="https://finanflix.com/" target="_blank">
            {/* <Image src={ffIsologo} alt="finanflix" /> */}
          </Link>
        </div>
        <div className=" my-auto mr-5">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain 
  
              return (
                <div
                  className="flex"
                  {...(!ready && {
                    'aria-hidden': true,
                    style: {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <Button
                          onClick={openConnectModal}
                          variant="outlined"
                          type="button"
                          className="bg-finanflixOrange px-4 py-1.5 text-finanflixBlack font-bold text-[18px] my-auto"
                        >
                          Conectar Wallet
                        </Button>
                      );
                    }
  
                    if (chain.unsupported) {
                      return (
                        <Button
                          onClick={openChainModal}
                          variant="outlined"
                          type="button"
                          className="bg-finanflixOrange px-4 py-1.5 text-finanflixBlack font-bold text-[18px] my-auto animate-pulse"
                        >
                          Wrong network
                        </Button>
                      );
                    }
  
                    return (
                      <div className="flex">
                        <Button
                          onClick={openChainModal}
                          type="button"
                          variant="outlined"
                          className="text-finanflixWhite font-bold text-[18px] my-auto mx-2"
                        >
                          {account.balanceSymbol && account.balanceSymbol}
                        </Button>
                        <Button
                          onClick={openAccountModal}
                          type="button"
                          variant="outlined"
                          className="text-finanflixWhite font-bold text-[18px] my-auto mx-2"
                        >
                          {account.displayName && account.displayName}
                        </Button>
  
                        {account.ensAvatar !== undefined ? (
                          <Button
                          variant="outlined"
                            onClick={openAccountModal}
                            className="w-[35px] h-[35px] rounded-full"
                          >
                            <Image
                              src={account.ensAvatar}
                              alt={account.ensAvatar}
                              className="w-[35px] h-[35px] rounded-full ml-2"
                            />
                          </Button>
                        ) : (
                          <Button
                            onClick={openAccountModal}
                            className="w-[35px] h-[35px] rounded-full bg-finanflixOrange ml-2"
                          ></Button>
                        )}
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    );
  };
  
  export default Nav;