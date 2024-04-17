require('dotenv').config()
const express = require("express")
const { router } = require("./routes/index") 
const { appRouter } = require("./routes/user")
const cors = require("cors")
const app = express()
const { errorHandler } = require("./error")
const PORT = process.env.PORT || 3001


app.use(cors())
app.use(express.json())
app.use("/api/v1", router)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`))
