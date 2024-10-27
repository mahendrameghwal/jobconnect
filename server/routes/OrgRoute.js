import express from "express";
import {CreateOrg, DeleteJob, GetOrgById,SearchOrg, UpdateOrgInformation, searchCandidates}  from "../controllers/OrgController.js";
import VerifyToken from "../middlewares/verifytoken.js";
import VerifyOrg from "../middlewares/Verifyorg.js"
const router = express.Router();

router.post('/create',VerifyToken,VerifyOrg,CreateOrg);
router.get('/getall/org',SearchOrg);
router.get('/getorg/:id',VerifyToken,GetOrgById);
router.get('/candidate/search',VerifyToken,VerifyOrg,searchCandidates);
router.delete('/job/delete/:id',VerifyToken,VerifyOrg,DeleteJob);
router.patch('/update',VerifyToken,VerifyOrg,UpdateOrgInformation);



// router.patch('/short-list/:jobid',VerifyToken,VerifyOrg,Shortlistappliciants);
export default router;