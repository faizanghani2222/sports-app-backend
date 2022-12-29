const express=require("express")
const cors=require("cors")
const bodyParser=require("body-parser")
require('dotenv').config()

const dbConnect = require('./src/dbConnect.js')
const PORT = process.env.PORT || 8080;
const userRouter=require("./src/routes/user/user.router")
const eventsRouter=require("./src/routes/events/events.router")
const app=express()


app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use("/user",userRouter)
app.use("/event",eventsRouter)




dbConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`)
    })
})