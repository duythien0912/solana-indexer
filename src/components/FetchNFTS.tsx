import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback, useState } from 'react';
import { notify } from "../utils/notifications";
import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js-next";
import { Connection, clusterApiUrl } from "@solana/web3.js";


export const FetchNFTS: FC = () => {

    const [NFTList, setNFTList] = useState([]);
  
const connection = new Connection(clusterApiUrl("devnet"));
const key = [209,180,0,24,29,165,237,25,23,223,195,104,4,250,94,117,156,224,109,59,57,110,0,175,249,192,56,65,140,117,250,54,63,146,28,49,99,138,186,87,72,58,49,194,199,238,116,4,42,74,153,96,191,217,29,177,228,150,27,87,60,186,34,16]
              

const secret = new Uint8Array(key)

let myNFTs;

const wallet = Keypair.fromSecretKey(secret,true);
const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(bundlrStorage());

    const onClick = useCallback(async () => {
        
        
        try {
       
    
         myNFTs = await metaplex.nfts().findAllByOwner(metaplex.identity().publicKey);
      
          console.log(myNFTs);
          let arr = [];
          myNFTs.map(async (x) => {
            let uri = await fetch(x.uri);
            let res = await uri.json();
            arr.push(res);
            console.log("uri is", res.name);
          })
          setNFTList(arr);
          console.log("NFTList is", arr);
        } catch(err) {
          console.log(err);
        }
        
    }, [ notify, connection]);

    const fetchNFTs = async () =>{
        // console.log("FETCHING NFTS");
        // myNFTs = await metaplex.nfts().findAllByOwner(metaplex.identity().publicKey);
        // console.log(myNFTs);
        // myNFTs.map((x) => {
        //     let uri = fetch(x.uri);
        //     console.log("uri is", uri);
        //   })

    }

    return (
        <div>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick} disabled={0}
            >
                <div className="hidden group-disabled:block ">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" > 
                    Fetch NFTS
                </span>
            </button>
            <li>
            {NFTList.map((x) => {
            // let uri = await fetch(x.uri);
            // let res = await uri.json();
            return (
                <img         width={200} height={200} src={x.image} />
            )
        })}
            </li>

            
        </div>
    );
};
