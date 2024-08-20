const express = require("express");
const {Createjob,RejectedSingleCandidate, ShortListSingleCandidate,getAllJobs, GetJobById, DeleteAlljob,UpdateJobInformation, getPernoalizePost, SearchJobPost, AppliedCandidate, GenrateCategory} = require("../controllers/JobController");
const Verifyorg = require("../middlewares/Verifyorg");
const VerifyToken= require('../middlewares/verifytoken');

const router = express.Router()
router.post('/create',VerifyToken,Verifyorg,Createjob);
router.get('/getall/jobs', getAllJobs);
router.get('/category', GenrateCategory);
router.get('/getjob/:id', GetJobById);
router.get('/jobdetail/:id',VerifyToken,Verifyorg,AppliedCandidate);
router.get('/posts/my-posts/:authorid', getPernoalizePost);
router.get('/post/search', SearchJobPost);
router.delete('/deletejob/all', DeleteAlljob);
router.patch('/updatejob',VerifyToken,Verifyorg, UpdateJobInformation);
router.patch('/reject/:applicationId/:candidateId',VerifyToken,Verifyorg, RejectedSingleCandidate);
router.patch('/shortlist/:applicationId/:candidateId',Verifyorg , VerifyToken , ShortListSingleCandidate);

module.exports = router;