const express = require('express');
const router = express.Router();


const {capturePayment , verifySignature} = require('../controller/Payment');
const {auth,isInstructor,isStudent,isAdmin} = require('../middleware/auth');


router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifySignature",verifySignature);


module.exports = router;