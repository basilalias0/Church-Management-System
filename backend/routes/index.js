const express = require('express');
const userRouter = require('./userRouter');
const parishMemberRouter = require('./parishMemberRouter');
const bloodDonorRouter = require('./bloodDonorRouter');
const virtualIdCardRouter = require('./virtualIdCardRouter');
const router = express()

router.use("/users",userRouter)
router.use("/parish-member",parishMemberRouter)
router.use("/blood-donor",bloodDonorRouter)
router.use("/id-card",virtualIdCardRouter)

module.exports = router;