const express=require("express")
const cors=require("cors")
const bodyParser=require("body-parser")
require('dotenv').config()

const dbConnect = require('./dbConnect.js')
const PORT = process.env.PORT || 8080;
const userRouter=require("./routes/user/user.router")
const eventsRouter=require("./routes/events/events.router")
const app=express()


app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use("/user",userRouter)
app.use("/event",eventsRouter)

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/utils/index.html')
})


dbConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`)
    })
})