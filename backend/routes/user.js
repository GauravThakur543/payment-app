const { Router } = require("express")
const appRouter = Router()
const {z} = require("zod")
const { User, Account } = require("../db")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")
const { authMiddleware } = require("./middleware")
const mongoose = require("mongoose")

appRouter.post("/signup", async(req, res, next) => {
 const {username, password, firstName, lastName} = req.body

 const userSchema = z.object({
    username: z.string().email().min(3).max(30).trim().toLowerCase(),
    password: z.string().min(6),
    firstName: z.string().max(50).trim(),
    lastName: z.string().max(50).trim(),
 })
 try{
   userSchema.parse({username, password, firstName, lastName})
 }
 catch(err){
    next(err)
    return
 }
 
 const isUserExists = await User.findOne({username: username})
 if(isUserExists){
   res.status(400).json({err: "This email id is taken. Use a differnet one"})
   return
 }

 const userToSave = new User({username , password, firstName, lastName})
 const {_id: id} = await userToSave.save()

 //create an account for user and give them some balance
 const account = new Account({userId: id, balance: Math.floor(Math.random() * 10000 + 1)})
 await account.save()

 const token = jwt.sign({userId:id}, JWT_SECRET)

 res.status(201).json({token})
})

appRouter.post("/signin", async(req, res, next) => {
   const { username, password } = req.body
   console.log(username, password)
   const userSchema = z.object({
      username: z.string().email().trim().min(3).max(30),
      password: z.string().min(6)
   }) 
   try{
      userSchema.parse({username, password})
   }
   catch(err){
      next(err)
      return
   }

   const isUserExists = await User.findOne({username: username})
   console.log(isUserExists)
   if(isUserExists && isUserExists.password === password )
   {
      const token = jwt.sign({userId: isUserExists._id}, JWT_SECRET)
      return res.status(200).json({token: token})
   }
   res.status(400).json({message: "Error while logging in"})
})

appRouter.put("/", authMiddleware, async(req, res, next) => {
   const { userId } = req
   const dataToUpdate = req.body
   delete dataToUpdate.username

   try{
      const updatedUser = await User.findByIdAndUpdate(userId, dataToUpdate, {runValidators: true, new: true})
      res.status(201).json(updatedUser)
   }
   catch(err){
      res.json({err: "Error while updating"})
      return
   }
})


appRouter.get("/bulk", async (req, res, next) => {
  let filter = req.query.filter || ""
  filter = new RegExp(filter)

  const users = await User.find({
   $or : [
      {
         "firstName": { $regex: filter, $options: "i" }
      },
      {
         "lastName": { $regex: filter, $options: "i"}
      }
   ]
  })

  res.json({
   users: users.map(user => {
      return {
         firstName: user.firstName,
         lastName: user.lastName,
         id: user._id
      }
   })
  })
})

appRouter.post("/createAccount", authMiddleware, async(req, res, next) => {
   const userId= req.userId
   let account = new Account({userId, balance: 5000})
   account = await account.save()
   res.json({msg: "Account created Successfully!", account: account})
})

module.exports = {appRouter}