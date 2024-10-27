import express from "express";
import { 
  CreateCandidate, 
  getAllCandidate, 
  EditCandidateInformation, 
  UpdateResume, 
  ApplyToJob, 
  GetCandidateById, 
  UpdateCandidateProfile, 
  generatePDF 
} from "../controllers/CandidateController.js"; 
const router = express.Router();
import VerifyToken from '../middlewares/verifytoken.js';
import VerifyCandidate from "../middlewares/VerifyCandidate.js";
import VerifyAdmin from "../middlewares/VerifyAdmin.js";


router.get('/getall/candidate',VerifyAdmin,getAllCandidate)
router.get('/get/:id',VerifyToken,GetCandidateById)
router.post('/create',VerifyToken,VerifyCandidate,CreateCandidate);
router.put('/edit',VerifyToken,VerifyCandidate,EditCandidateInformation);
router.patch('/apply/:jobid',VerifyToken,VerifyCandidate,ApplyToJob);
router.put('/update/profile',VerifyToken,VerifyCandidate,UpdateCandidateProfile);
router.put('/upload/resume',VerifyToken,VerifyCandidate,UpdateResume);
router.post('/generate-pdf',VerifyToken,VerifyCandidate,generatePDF)








export default router
