import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const nftSchema = mongoose.Schema({
    
    url: String,
    publicKey: String,
    buyerWallet: String,
    sellerWallet: String,
    mintKey: String,
    isListed: {
        type: Boolean,
        default: false
    },
    isBuy: {
        type: Boolean,
        default: false
    },
    isExecuteSell: {
        type: Boolean,
        default: false
    },
    listedAt: {
        type: Date,
        default: new Date()
    },
    amount: Number,
    auctionHouseKey: String
})

const userSchema = mongoose.Schema({

    publicKey: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const signatureSchema = mongoose.Schema({

    signature: String,
    publicKey: String,
    isSigned: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

// userSchema.methods.getJWTToken = function () {
//     return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRE,
//     })
// }

export const User = mongoose.model("users", userSchema)
export const Nft = mongoose.model("nfts", nftSchema)
export const Signature = mongoose.model("signatureSchema", signatureSchema)