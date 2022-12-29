const express=require("express")
const jwt=require("jsonwebtoken")
const User = require("../user/user.model")
require('dotenv').config()

const secretkey=process.env.SECRET_KEY
const app=express.Router()
const Event=require("./events.model")

app.post("/join",async(req,res)=>{
    try{
        const {token,data}=req.body
        const userverify=jwt.verify(token,secretkey)
        const username=data.username
        let user=await User.findOne({username:userverify.username})
        let orgainzer=await User.findOne({username})
        if(!orgainzer){
            res.status(401).send({message:"user not found"})
        }
        const ndata={
            username:user.username,
            message:`${user.username} wants to join ${data.event}`,
            requestid:user.events.length,
            timing:data.timing
        }
        orgainzer.notification.push(ndata)
        orgainzer=await orgainzer.save()

        const edata={
            name:data.event,
            timing:data.eventtiming,
            status:"pending"
        }
        user.events.push(edata)
        user=await user.save()

        res.send({message:"Request send successfully"})
    }catch(e){
        res.status(401).send({message:"Request Failed try agin",error:e})
    }
})


app.post("/create",async(req,res)=>{
    try{
        const {token,data}=req.body
       const organizerverify=jwt.verify(token,secretkey)
       let event=new Event(data)
       event=await event.save()
       res.send(event) 
    }catch(e){
        res.status(401).send({message:"Failed to create event try again!",error:e})
    }
})

app.post("/addplayer",async(req,res)=>{
    try{
        const {token,data}=req.body
        const organizerverify=jwt.verify(token,secretkey)
        let name=data.name
        let username=data.username
        let event=await Event.findOne({name})
        let user=await User.findOne({username})
        if(event.limit<=event.players.length){
            res.status(401).send({message:"No more players allowed in the event"})
        }
        else if(data.timing>event.timing){
            res.status(401).send({message:"Request Expired"})
        }
        else{
            let temp=user
            temp.events[data.requestid].status="accepted"
            let u=await User.findOneAndUpdate({username},temp)
            u=await u.save()
            event.players.push(data.username)
            event=await event.save()
            res.send(event)
        }
    }catch(e){
        console.log(e)
        res.status(401).send({message:"Failed to add player try again!",error:e})
    }
})

app.get("/",async(req,res)=>{
    try{
        let event=await Event.find()
        res.send(event)
    }catch(e){
        res.status(401).send({message:"Failed to add player try again!",error:e})
    }
})

module.exports=app