const {Router} = require("express")
const router = Router()
const { appRouter } = require("./user")
const { accountRouter } = require("./account")

router.use("/user", appRouter)
router.use("/account", accountRouter)

module.exports = { router }