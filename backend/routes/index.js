const express = require('express');
const userRouter = require('./userRouter');
const parishMemberRouter = require('./parishMemberRouter');
const router = express()

router.use("/users",userRouter)
router.use("/parish-member",parishMemberRouter)

module.exports = router;