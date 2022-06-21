import { NFTS } from "../model/nfts.js";
export const listNFT = async (req, res) => {
    try {

        const { owner, mintKey, priceAmount } = req.body

        const findMintKey = await NFTS.findOne({
            mintKey
        })

        if (!findMintKey) {

            try {
                const newNft = new NFTS({
                    mintKey, owner, priceAmount
                })
                newNft.save(async (_, nft) => {
                    return res.status(201).json(nft);
                })
            }
            catch (error) {
                return res.status(400).json({ message: error.message })
            }

        }
        else {
            return res.status(404).json({
                success: false,
                message: "NFT is already listed"
            })
        }
    } catch (error) {
        return res.status(409).json({ error: error.message })
    }
}



export const getNFTDetails = async (req, res) => {
    // console.log(req)
    try {

        var mintKey = req.params.mint;
        const nft = await NFTS.findOne({
            mintKey
        })
        if (nft) {
            return res.status(201).json({
                success: true,
                data: nft,
                message: "nft Details fetched"
            })
        } else return res.status(404).json({
            success: false,
            message: "nft not found."
        })
    } catch (error) {
        return res.status(409).json({ error: error.message })
    }

}

// //browse:- nfts listed for sale
// export const fetchAllNfts = async (req, res) => {
//     try {
//         // const {isListed} = req.body
//         const nfts = await NFTS.find({
//             inSale: true
//         })
//         if (nfts) {
//             res.status(200).json({
//                 success: true,
//                 message: nfts
//             });
//         } else {
//             return res.status(404).json({
//                 success: false,
//                 message: "No nfts are on sale."
//             })
//         }


//     } catch (error) {
//         res.status(409).json({ error: error.message })
//     }
// }


export const isListed = async (req, res) => {
    try {
        // const mintKey  = req.query.mintKey;
        // console.log("mint", mintKey);
        const { mintKey } = req.body
        if (mintKey) {
            const nft = await NFTS.findOne({
                mintKey: mintKey
            })
            if(nft)
            {
                if (nft.inSale == true) {
                    res.status(200).json({
                        status: 1,
                        message: "This NFT is Listed"
                    })
                }

            }
            else{
                res.status(200).json({
                    status: 0,
                    message: "This NFT is not Listed"
                })
            }
            
        }
        else return res.status(404).json({
            success: false,
            message: "mintKey not found."
        })
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

// //collections:- nfts owned
// export const fetchAllUserOwnedNfts = async (req, res) => {
//     try {
//         const { publicKey } = req.body
//         const user = await User.findOne({
//             publicKey
//         })
//         if (user) {
//             const nft = await Nft.find({
//                 publicKey
//             })
//             res.status(200).json({
//                 success: true,
//                 message: nft
//             })
//         } else return res.status(404).json({
//             success: false,
//             message: "User not found."
//         })


//     } catch (error) {
//         res.status(409).json({ error: error.message })
//     }
// }
