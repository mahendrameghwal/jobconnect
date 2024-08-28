const express = require("express");
const {CreateCandidate, getAllCandidate,EditCandidateInformation,UpdateResume, ApplyToJob, GetCandidateById, UpdateCandidateProfile, generatePDF} = require("../controllers/CandidateController");
const router = express.Router();
const VerifyToken = require('../middlewares/verifytoken');
const VerifyCandidate = require("../middlewares/VerifyCandidate");
const VerifyAdmin = require("../middlewares/VerifyAdmin");



router.get('/getall/candidate',VerifyAdmin,getAllCandidate)
router.get('/get/:id',VerifyToken,GetCandidateById)
router.post('/create',VerifyToken,VerifyCandidate,CreateCandidate);
router.put('/edit',VerifyToken,VerifyCandidate,EditCandidateInformation);
router.patch('/apply/:jobid',VerifyToken,VerifyCandidate,ApplyToJob);
router.put('/update/profile',VerifyToken,VerifyCandidate,UpdateCandidateProfile);
router.put('/upload/resume',VerifyToken,VerifyCandidate,UpdateResume);
router.post('/generate-pdf',VerifyToken,VerifyCandidate,generatePDF)








module.exports = router
