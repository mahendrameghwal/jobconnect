const GetAPIKEY = require("../controllers/GetAPIkey");
const express = require("express");
const router = express.Router();

router.get('/secretkey',GetAPIKEY);
module.exports = router;