import express from "express"
import {createListedNfts, fetchAllNfts, fetchAllUserOwnedNfts, signSignature, createExecuteSell, createBuy} from "../controller/api.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router()

router.post('/createListedNfts', createListedNfts);
router.get("/fetchAllNfts", fetchAllNfts);
router.get("/fetchAllUserOwnedNfts", fetchAllUserOwnedNfts);
router.post("/signSignature", signSignature);
router.post("/createExecuteSell", createExecuteSell);
router.post("/createBuy", createBuy);

export default router;