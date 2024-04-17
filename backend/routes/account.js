const { Router } = require("express")
const { authMiddleware } = require("./middleware")
const accountRouter = Router()
const { Account } = require("../db")
const mongoose = require("mongoose")

accountRouter.get("/balance", authMiddleware,  async(req, res, next) => {
    const {userId} = req
    const account = await Account.findOne({userId})
    if(!account)
    {
        res.status(404).json({err: "Account does not exist"})
        return
    }
    res.status(200).json({msg: `${account.balance}`})
})

accountRouter.post("/transfer", authMiddleware, async (req, res, next) => {
    const {userId} = req
    let {to, amount} = req.body
    const session = await mongoose.startSession()
    session.startTransaction()
    try{
        const senderAcc = await Account.findOne({userId}).session(session)
        if(!senderAcc || senderAcc.balance < amount)
        {
            res.status(400).json({err: 'Invalid Amount'})
            throw new Error()
        }
        
        const receiver = await Account.findById(to).session(session)

        if(!receiver){
            res.status(400).json({err: "Receiver does not exist"})
            throw new Error()
        }

        await Account.findByIdAndUpdate(senderAcc, {$inc : {balance : -amount}}).session(session)
        await Account.findByIdAndUpdate(to, {$inc : {balance : amount}}).session(session)
        await session.commitTransaction()
        res.status(200).json({msg: "Transaction Successfull"})
    }
    catch(err){
        console.error(err)
        await session.abortTransaction()
    }
    finally{
        session.endSession()
    }
})

accountRouter.get("/fetchAcc", async (req, res, next) => {
    const id = req.query.id
    const account = await Account.findOne({userId: id})
    if(!account)
    {
        res.status(404).json({err: "Account does not exist"})
        return
    }
    res.status(200).json({account})
})

module.exports = { accountRouter }