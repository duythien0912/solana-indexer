import { useWallet } from '@solana/wallet-adapter-react';
import { FC, useCallback, useState } from 'react';

import { cancel} from "../api/src/auction-house";

export const Cancel: FC = () => {
    let walletAddress = "";
    const [price, setPrice] = useState(''); // '' is the initial state value
    const [mintAddress, setMintAddress] = useState(''); // '' is the initial state value
    const [auctionHouseAddress,setAuctionHouseAddress]= useState(''); // '' is the initial state value
    
    
    const wallet = useWallet();
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
        console.log("my pub wallet ===>",walletAddress);
    }


    function getCancel() {
        alert('Execute Sale');
        cancel({ auctionHouse: auctionHouseAddress, buyPrice: price, mint: mintAddress, tokenSize: '1', env: 'devnet', wallet: wallet })
    } 
    
    return (
        <div>
            
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={getCancel} disabled={false}
            >
                <div className="hidden group-disabled:block ">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" >
                    Cancel
                </span>
            </button>
            <label>Auction House Address:
                    <input type="text" value={auctionHouseAddress} onInput={e => setAuctionHouseAddress((e.target as HTMLTextAreaElement).value)}/>
                </label>
                <label>Mint address:
                    <input type="text" value={mintAddress} onInput={e => setMintAddress((e.target as HTMLTextAreaElement).value)} />
                </label>
                <label>CurrentPrice:
                    <input type="number" value={price} onInput={e => setPrice((e.target as HTMLTextAreaElement).value)}/>
                </label>
        </div>
    );

};