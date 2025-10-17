import express from 'express';
import VerifyToken from '../middlewares/verifytoken.js';
import Verifyorg from '../middlewares/Verifyorg.js';
import { createInterview, listMyInterviews, listCandidateInterviews, updateInterview, deleteInterview } from '../controllers/InterviewController.js';

const router = express.Router();

// Org/recruiter protected
router.post('/', VerifyToken, Verifyorg, createInterview);
router.get('/', VerifyToken, Verifyorg, listMyInterviews);
router.get('/candidate', VerifyToken, listCandidateInterviews);
router.patch('/:id', VerifyToken, Verifyorg, updateInterview);
router.delete('/:id', VerifyToken, Verifyorg, deleteInterview);

export default router;


