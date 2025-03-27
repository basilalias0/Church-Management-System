const express = require('express');
const userRouter = require('./userRouter');
const parishMemberRouter = require('./parishMemberRouter');
const bloodDonorRouter = require('./bloodDonorRouter');
const virtualIdCardRouter = require('./virtualIdCardRouter');
const eventRouter = require('./eventRouter');
const quizRouter = require('./quizRouter');
const galleryRouter = require('./galleryRouter');
const budgetPlanningRouter = require('./budgetPlaningRouter');
const donationRouter = require('./donationRouter');
const familyMemberRouter = require('./familyMemberRouter');
const familyUnitRouter = require('./familyUnitRouter');
const transactionRouter = require('./transactionRouter');
const petitionRouter = require('./petitionRouter');
const notificationRouter = require('./notificationRouter');
const balanceSheetRouter = require('./balanceSheetRouter');
const receiptRouter = require('./receiptRouter');
const router = express()

router.use("/donation",donationRouter)

router.use(express.json());

router.use("/users",userRouter)
router.use("/parish-member",parishMemberRouter)
router.use("/blood-donor",bloodDonorRouter)
router.use("/id-card",virtualIdCardRouter)
router.use("/event",eventRouter)
router.use("/id-card",virtualIdCardRouter)
router.use("/gallery",galleryRouter)
router.use("/budget-planning",budgetPlanningRouter)
router.use("/family-member",familyMemberRouter)
router.use("/family-unit",familyUnitRouter)
router.use("/transaction",transactionRouter)
router.use("/petition",petitionRouter)
router.use("/quiz",quizRouter)
router.use("/notification",notificationRouter)
router.use("/balance-sheet",balanceSheetRouter)
router.use("/receipt",receiptRouter)


module.exports = router;