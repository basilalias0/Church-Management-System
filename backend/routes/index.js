const express = require('express');
const userRouter = require('./userRouter');
const parishMemberRouter = require('./parishMemberRouter');
const bloodDonorRouter = require('./bloodDonorRouter');
const router = express()

router.use("/users",userRouter)
router.use("/parish-member",parishMemberRouter)
router.use("/blood-donor",bloodDonorRouter)

module.exports = router;