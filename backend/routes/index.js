const express = require('express');
const userRouter = require('./userRouter');
const router = express()

router.use("/users",userRouter)

module.exports = router;