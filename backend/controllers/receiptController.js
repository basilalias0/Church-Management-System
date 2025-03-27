const asyncHandler = require('express-async-handler');
const Receipt = require('../models/receiptModel');

const receiptController = {
    getReceiptByTransactionId : asyncHandler(async(req,res)=>{
        const transactionId = req.params.transactionId;
        const receipt = await Receipt.findOne({transactionId:transactionId});
        if(!receipt){
            res.status(404).json({message:'Receipt not found'});
        }
        res.status(200).json(receipt)
    }),
    getAllReceipts : asyncHandler(async (req, res) => {
        const receipts = await Receipt.find({});
        res.status(200).json(receipts);
    })
}

module.exports = receiptController