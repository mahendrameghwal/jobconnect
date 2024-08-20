const express = require("express");
const {CreateOrg, DeleteJob, GetOrgById,SearchOrg, UpdateOrgInformation, searchCandidates}  = require("../controllers/OrgController");
const VerifyToken = require("../middlewares/verifytoken");
const VerifyOrg = require("../middlewares/Verifyorg")
const router = express.Router();

router.post('/create',VerifyToken,VerifyOrg,CreateOrg);
router.get('/getall/org',SearchOrg);
router.get('/getorg/:id',VerifyToken,GetOrgById);
router.get('/candidate/search',VerifyToken,VerifyOrg,searchCandidates);
router.delete('/job/delete/:id',VerifyToken,VerifyOrg,DeleteJob);
router.patch('/update',VerifyToken,VerifyOrg,UpdateOrgInformation);



// router.patch('/short-list/:jobid',VerifyToken,VerifyOrg,Shortlistappliciants);

module.exports = router;