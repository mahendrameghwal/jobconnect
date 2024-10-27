import GetAPIKEY from "../controllers/GetAPIkey.js";
import express from "express";
const router = express.Router();

router.get('/secretkey',GetAPIKEY);

export default router;